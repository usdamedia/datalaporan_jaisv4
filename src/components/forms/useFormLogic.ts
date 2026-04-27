import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { normalizeZeroValuesForInputs } from '../../utils/inputNormalization';
import { buildDraftKey } from '../../utils/formDraftKey';
import { db } from '../../firebase';

const CLIENT_ID =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? `client_${crypto.randomUUID()}`
    : `client_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

const getClientId = () => {
  if (typeof window === 'undefined') return 'unknown-client';
  return CLIENT_ID;
};

const dispatchDraftLoading = (isLoading: boolean, deptName: string) => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('jais:draft-loading', {
      detail: { isLoading, deptName },
    })
  );
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const sanitizeForFirestore = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeForFirestore(item))
      .filter((item) => item !== undefined);
  }

  if (isPlainObject(value)) {
    return Object.entries(value).reduce<Record<string, unknown>>((acc, [key, item]) => {
      const sanitized = sanitizeForFirestore(item);
      if (sanitized !== undefined) {
        acc[key] = sanitized;
      }
      return acc;
    }, {});
  }

  if (value === undefined) {
    return undefined;
  }

  return value;
};

const mergeDraftData = <T,>(baseValue: T, draftValue: unknown): T => {
  if (draftValue === undefined) return baseValue;
  if (Array.isArray(baseValue) || Array.isArray(draftValue)) return draftValue as T;

  if (isPlainObject(baseValue) && isPlainObject(draftValue)) {
    const merged = { ...baseValue } as Record<string, unknown>;

    Object.entries(draftValue).forEach(([key, value]) => {
      merged[key] = key in merged ? mergeDraftData(merged[key], value) : value;
    });

    return merged as T;
  }

  return draftValue as T;
};

export const useFormLogic = (deptName: string, initialState: any) => {
  const initialStateRef = useRef<any>(normalizeZeroValuesForInputs(initialState));
  const [formData, setRawFormData] = useState<any>(() => initialStateRef.current);
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);
  const successTimeoutRef = useRef<number | null>(null);
  const loadedStorageKeyRef = useRef<string | null>(null);
  const storageKey = useMemo(() => buildDraftKey(deptName), [deptName]);
  const latestPayloadRef = useRef<any>(initialStateRef.current);
  const lastFirestorePayloadRef = useRef<any>(sanitizeForFirestore(initialStateRef.current));

  const mergeWithInitialState = useCallback((payload: any) => {
    return normalizeZeroValuesForInputs(mergeDraftData(initialStateRef.current, payload || {}));
  }, []);

  const syncToCloud = useCallback(
    async (
      payload: any,
      metadata?: {
        officerName?: string;
        action?: 'manual_save' | 'autosave' | 'reconnect_sync';
      }
    ) => {
      const officerName = metadata?.officerName?.trim() || null;
      const action = metadata?.action || 'autosave';
      const clientId = getClientId();
      let draftSyncFailed = false;
      const sanitizedPayload = sanitizeForFirestore(payload);

      try {
        const draftUpdatePayload: Record<string, unknown> = {
          deptName,
          storageKey,
          data: sanitizedPayload,
          updatedByUid: null,
          updatedByEmail: `guest@${clientId}`,
          updatedByClientId: clientId,
          lastAction: action,
          lastOfficerName: officerName,
          updatedAt: serverTimestamp(),
          clientUpdatedAt: new Date().toISOString(),
        };

        await setDoc(doc(db, 'drafts_2025', storageKey), draftUpdatePayload);
        lastFirestorePayloadRef.current = sanitizedPayload;
      } catch (error) {
        draftSyncFailed = true;
        console.error('Error syncing draft data to Firestore', error);
      }

      if (action !== 'manual_save') {
        return;
      }

      const logPayload = {
        deptName,
        storageKey,
        action,
        officerName: officerName || 'Tetamu',
        updatedByUid: null,
        updatedByEmail: `guest@${clientId}`,
        updatedByClientId: clientId,
        createdAt: serverTimestamp(),
        clientCreatedAt: new Date().toISOString(),
      };

      try {
        await addDoc(collection(db, 'update_logs_central'), logPayload);
      } catch (error) {
        console.error('Error writing central update log to Firestore', error);
        throw error;
      }

      try {
        await addDoc(collection(db, 'drafts_2025', storageKey, 'update_logs'), logPayload);
      } catch (error) {
        // Keep the central audit log as the source of truth even if the nested mirror fails.
        console.error('Error writing nested update log to Firestore', error);
      }

      if (draftSyncFailed) {
        throw new Error('Draft saved locally but Firestore draft sync failed.');
      }
    },
    [deptName, storageKey]
  );

  useEffect(() => {
    if (loadedStorageKeyRef.current === storageKey) {
      return;
    }

    initialStateRef.current = normalizeZeroValuesForInputs(initialState);
    latestPayloadRef.current = initialStateRef.current;
    lastFirestorePayloadRef.current = sanitizeForFirestore(initialStateRef.current);
    setRawFormData(initialStateRef.current);
    loadedStorageKeyRef.current = storageKey;

    let cancelled = false;

    const hydrateFromCloud = async () => {
      dispatchDraftLoading(true, deptName);

      try {
        const snapshot = await getDoc(doc(db, 'drafts_2025', storageKey));
        
        if (cancelled) return;

        if (!snapshot.exists()) {
          setRawFormData(initialStateRef.current);
          latestPayloadRef.current = initialStateRef.current;
          return;
        }

        const cloudData = snapshot.data()?.data;
        if (!cloudData) {
          setRawFormData(initialStateRef.current);
          latestPayloadRef.current = initialStateRef.current;
          return;
        }

        const mergedCloudData = mergeWithInitialState(cloudData);
        setRawFormData(mergedCloudData);
        latestPayloadRef.current = mergedCloudData;
        lastFirestorePayloadRef.current = sanitizeForFirestore(mergedCloudData);
      } catch (error) {
        if (!cancelled) {
          console.error('Error loading Firestore draft', error);
          setRawFormData(initialStateRef.current);
          latestPayloadRef.current = initialStateRef.current;
        }
      } finally {
        if (!cancelled) {
          dispatchDraftLoading(false, deptName);
        }
      }
    };

    void hydrateFromCloud();

    return () => {
      cancelled = true;
      dispatchDraftLoading(false, deptName);
      loadedStorageKeyRef.current = null;
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergeWithInitialState, storageKey, syncToCloud]);

  const setFormData = useCallback((value: any) => {
    setRawFormData((prev: any) => {
      const next = typeof value === 'function' ? value(prev) : value;
      const normalized = normalizeZeroValuesForInputs(next);
      latestPayloadRef.current = normalized;
      return normalized;
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = (dataToSave?: any) => {
    // Determine if dataToSave is a React synthetic event or DOM event
    const isEvent = dataToSave && typeof dataToSave === 'object' && ('nativeEvent' in dataToSave || 'preventDefault' in dataToSave);
    const payload = (dataToSave && !isEvent) ? dataToSave : formData;

    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    if (successTimeoutRef.current) {
      window.clearTimeout(successTimeoutRef.current);
    }

    setSaveError(null);
    setShowSuccess(false);
    setIsSaving(true);
    latestPayloadRef.current = payload;

    const officerNameInput = window.prompt(
      'Sila isikan nama anda untuk pengesahan kemas kini data:',
      ''
    );
    if (officerNameInput === null) {
      setIsSaving(false);
      setSaveError('Simpanan dibatalkan. Nama pegawai diperlukan untuk pengesahan.');
      return;
    }

    const normalizedOfficerName = officerNameInput.trim();
    if (!normalizedOfficerName) {
      setIsSaving(false);
      setSaveError('Simpanan dibatalkan. Sila isi nama pegawai.');
      return;
    }

    saveTimeoutRef.current = window.setTimeout(() => {
      (async () => {
        try {
          await syncToCloud(payload, { action: 'manual_save', officerName: normalizedOfficerName });
        setShowSuccess(true);
        successTimeoutRef.current = window.setTimeout(() => setShowSuccess(false), 3000);
          setSaveError(null);
        } catch (error) {
          console.error('Error saving data', error);
          setShowSuccess(false);
          const firestoreError = error as { code?: string };
          const errorSuffix = firestoreError?.code ? ` (${firestoreError.code})` : '';
          setSaveError(`Data disimpan lokal tetapi log/sync Firestore gagal${errorSuffix}. Sila semak sambungan internet atau rules.`);
        } finally {
          setIsSaving(false);
        }
      })();
    }, 800);
  };

  // Online reconnect handling is now natively managed by Firebase Firestore Offline Persistence.

  const addLawatan = () => {
    setFormData((prev: any) => ({
      ...prev,
      lawatan: [
        ...(prev.lawatan || []),
        { jenis: 'keluar', tajukAgensi: '', tarikh: '', tempat: '', objektif: '' }
      ]
    }));
  };

  const removeLawatan = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      lawatan: prev.lawatan?.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateLawatan = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newLawatan = [...(prev.lawatan || [])];
      newLawatan[index] = { ...newLawatan[index], [field]: value };
      return { ...prev, lawatan: newLawatan };
    });
  };

  return {
    formData,
    setFormData,
    isSaving,
    isAutoSaving,
    showSuccess,
    saveError,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan
  };
};
