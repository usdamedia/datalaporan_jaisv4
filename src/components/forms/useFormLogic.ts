import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { normalizeZeroValuesForInputs } from '../../utils/inputNormalization';
import { buildDraftKey } from '../../utils/formDraftKey';
import { db } from '../../firebase';

const CLIENT_ID_STORAGE_KEY = 'jais_client_id_2025';
const OFFICER_NAME_STORAGE_KEY = 'jais_last_officer_name_2025';

const getClientId = () => {
  if (typeof window === 'undefined') return 'unknown-client';

  try {
    const existing = window.localStorage.getItem(CLIENT_ID_STORAGE_KEY);
    if (existing) return existing;

    const generated = `client_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, generated);
    return generated;
  } catch (error) {
    console.error('Unable to access client id storage', error);
    return 'unknown-client';
  }
};

const getLastOfficerName = () => {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(OFFICER_NAME_STORAGE_KEY) || '';
  } catch (error) {
    console.error('Unable to read last officer name', error);
    return '';
  }
};

const setLastOfficerName = (name: string) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(OFFICER_NAME_STORAGE_KEY, name);
  } catch (error) {
    console.error('Unable to persist last officer name', error);
  }
};

export const useFormLogic = (deptName: string, initialState: any) => {
  const initialStateRef = useRef<any>(normalizeZeroValuesForInputs(initialState));
  const [formData, setRawFormData] = useState<any>(() => initialStateRef.current);
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);
  const autoSaveTimeoutRef = useRef<number | null>(null);
  const autoSaveIndicatorTimeoutRef = useRef<number | null>(null);
  const successTimeoutRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);
  const loadedStorageKeyRef = useRef<string | null>(null);
  const storageKey = useMemo(() => buildDraftKey(deptName), [deptName]);
  const latestPayloadRef = useRef<any>(initialStateRef.current);

  const mergeWithInitialState = useCallback((payload: any) => {
    const baseState = initialStateRef.current;

    return normalizeZeroValuesForInputs({
      ...baseState,
      ...payload,
      bpds: baseState.bpds ? { ...baseState.bpds, ...payload?.bpds } : baseState.bpds,
      bkim: baseState.bkim ? { ...baseState.bkim, ...payload?.bkim } : baseState.bkim,
      finance: baseState.finance ? { ...baseState.finance, ...payload?.finance } : baseState.finance,
      leadership: baseState.leadership ? { ...baseState.leadership, ...payload?.leadership } : baseState.leadership,
      transport: baseState.transport ? { ...baseState.transport, ...payload?.transport } : baseState.transport,
      bkki: baseState.bkki ? { ...baseState.bkki, ...payload?.bkki } : baseState.bkki,
      socialMedia: baseState.socialMedia ? { ...baseState.socialMedia, ...payload?.socialMedia } : baseState.socialMedia,
      aduan: baseState.aduan ? { ...baseState.aduan, ...payload?.aduan } : baseState.aduan,
      pr: baseState.pr ? { ...baseState.pr, ...payload?.pr } : baseState.pr,
      bpnp: baseState.bpnp ? { ...baseState.bpnp, ...payload?.bpnp } : baseState.bpnp,
      bksk: baseState.bksk ? { ...baseState.bksk, ...payload?.bksk } : baseState.bksk,
      hr: baseState.hr ? { ...baseState.hr, ...payload?.hr } : baseState.hr,
      bksp: baseState.bksp ? { ...baseState.bksp, ...payload?.bksp } : baseState.bksp,
      ukoko: baseState.ukoko ? { ...baseState.ukoko, ...payload?.ukoko } : baseState.ukoko,
      dhqc: baseState.dhqc ? { ...baseState.dhqc, ...payload?.dhqc } : baseState.dhqc,
      upp: baseState.upp ? { ...baseState.upp, ...payload?.upp } : baseState.upp,
      integriti: baseState.integriti ? { ...baseState.integriti, ...payload?.integriti } : baseState.integriti,
      quality: baseState.quality ? { ...baseState.quality, ...payload?.quality } : baseState.quality,
      penerbitan: baseState.penerbitan ? { ...baseState.penerbitan, ...payload?.penerbitan } : baseState.penerbitan,
    });
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

      try {
        await setDoc(
          doc(db, 'drafts_2025', storageKey),
          {
            deptName,
            storageKey,
            data: payload,
            updatedByUid: null,
            updatedByEmail: `guest@${clientId}`,
            updatedByClientId: clientId,
            lastAction: action,
            lastOfficerName: officerName,
            updatedAt: serverTimestamp(),
            clientUpdatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
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
    let savedData: string | null = null;
    let parsedLocalData: any = null;

    try {
      savedData = localStorage.getItem(storageKey);

      // Migrate older records that used the raw department label as the key.
      if (!savedData) {
        const legacyKey = `jais_2025_${deptName}`;
        const legacyData = localStorage.getItem(legacyKey);

        if (legacyData) {
          savedData = legacyData;
          localStorage.setItem(storageKey, legacyData);
        }
      }
    } catch (error) {
      console.error('Error loading saved data', error);
      setSaveError('Pelayar ini menghalang simpanan lokal. Sila semak mod private/incognito atau ruang storan.');
      return;
    }

    if (savedData) {
      try {
        parsedLocalData = JSON.parse(savedData);
        setSaveError(null);
        setRawFormData(mergeWithInitialState(parsedLocalData));
        latestPayloadRef.current = parsedLocalData;
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    } else {
      setRawFormData(initialStateRef.current);
    }

    loadedStorageKeyRef.current = storageKey;

    let cancelled = false;

    const hydrateFromCloud = async () => {
      try {
        const snapshot = await getDoc(doc(db, 'drafts_2025', storageKey));
        if (cancelled || !snapshot.exists()) {
          if (parsedLocalData) {
            void syncToCloud(parsedLocalData, { action: 'reconnect_sync' });
          }
          return;
        }

        const cloudData = snapshot.data()?.data;
        if (!cloudData) return;

        if (parsedLocalData) {
          void syncToCloud(parsedLocalData, { action: 'reconnect_sync' });
          return;
        }

        setRawFormData(mergeWithInitialState(cloudData));
        latestPayloadRef.current = cloudData;
        localStorage.setItem(storageKey, JSON.stringify(cloudData));
      } catch (error) {
        if (!cancelled) {
          console.error('Error loading Firestore draft', error);
        }
      }
    };

    void hydrateFromCloud();

    return () => {
      cancelled = true;
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
      if (autoSaveTimeoutRef.current) {
        window.clearTimeout(autoSaveTimeoutRef.current);
      }
      if (autoSaveIndicatorTimeoutRef.current) {
        window.clearTimeout(autoSaveIndicatorTimeoutRef.current);
      }
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, [initialState, mergeWithInitialState, storageKey, syncToCloud]);

  const setFormData = useCallback((value: any) => {
    setRawFormData((prev: any) => {
      const next = typeof value === 'function' ? value(prev) : value;
      const normalized = normalizeZeroValuesForInputs(next);
      latestPayloadRef.current = normalized;
      return normalized;
    });
  }, []);

  // Handle Auto-Save
  useEffect(() => {
    // Avoid saving on first load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (autoSaveTimeoutRef.current) {
      window.clearTimeout(autoSaveTimeoutRef.current);
    }
    if (autoSaveIndicatorTimeoutRef.current) {
      window.clearTimeout(autoSaveIndicatorTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = window.setTimeout(() => {
      try {
        setIsAutoSaving(true);
        localStorage.setItem(storageKey, JSON.stringify(formData));
        void syncToCloud(formData, { action: 'autosave' });
      } catch (error) {
        console.error('Error auto-saving data', error);
        setIsAutoSaving(false);
        setSaveError('Simpanan lokal gagal. Sila semak storage pelayar anda.');
        return;
      }
      autoSaveIndicatorTimeoutRef.current = window.setTimeout(() => setIsAutoSaving(false), 500);
    }, 1200); // Debounce delay 1.2s

    return () => {
      if (autoSaveTimeoutRef.current) {
        window.clearTimeout(autoSaveTimeoutRef.current);
      }
      if (autoSaveIndicatorTimeoutRef.current) {
        window.clearTimeout(autoSaveIndicatorTimeoutRef.current);
      }
    };
  }, [formData, storageKey, syncToCloud]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRawFormData((prev: any) => ({ ...prev, [name]: value }));
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

    const suggestedOfficerName = getLastOfficerName();
    const officerNameInput = window.prompt(
      'Sila isikan nama anda untuk pengesahan kemas kini data:',
      suggestedOfficerName
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

    setLastOfficerName(normalizedOfficerName);

    saveTimeoutRef.current = window.setTimeout(() => {
      (async () => {
        try {
        localStorage.setItem(storageKey, JSON.stringify(payload));
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

  useEffect(() => {
    const handleOnline = () => {
      try {
        const savedData = localStorage.getItem(storageKey);
        if (!savedData) {
          void syncToCloud(latestPayloadRef.current, { action: 'reconnect_sync' });
          return;
        }

        void syncToCloud(JSON.parse(savedData), { action: 'reconnect_sync' });
      } catch (error) {
        console.error('Error syncing local draft after reconnect', error);
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [storageKey, syncToCloud]);

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
