import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { normalizeZeroValuesForInputs } from '../../utils/inputNormalization';
import { buildDraftKey } from '../../utils/formDraftKey';
import {
  fetchRemoteDraft,
  subscribeToRemoteDraft,
  unsubscribeFromRemoteDraft,
  upsertRemoteDraft,
} from '../../utils/reportDraftStore';
import { isSupabaseConfigured } from '../../utils/supabase';

export const useFormLogic = (deptName: string, initialState: any) => {
  const [formData, setRawFormData] = useState<any>(() => normalizeZeroValuesForInputs(initialState));
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);
  const autoSaveTimeoutRef = useRef<number | null>(null);
  const autoSaveIndicatorTimeoutRef = useRef<number | null>(null);
  const successTimeoutRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);
  const remoteSyncTimeoutRef = useRef<number | null>(null);
  const latestFormDataRef = useRef<any>(formData);
  const lastRemoteSnapshotRef = useRef<string>('');
  const isApplyingRemoteRef = useRef(false);
  const storageKey = useMemo(() => buildDraftKey(deptName), [deptName]);

  const mergeWithInitialState = useCallback((payload: any) => normalizeZeroValuesForInputs({
    ...initialState,
    ...payload,
    bpds: initialState.bpds ? { ...initialState.bpds, ...payload?.bpds } : initialState.bpds,
    bkim: initialState.bkim ? { ...initialState.bkim, ...payload?.bkim } : initialState.bkim,
    finance: initialState.finance ? { ...initialState.finance, ...payload?.finance } : initialState.finance,
    leadership: initialState.leadership ? { ...initialState.leadership, ...payload?.leadership } : initialState.leadership,
    transport: initialState.transport ? { ...initialState.transport, ...payload?.transport } : initialState.transport,
    bkki: initialState.bkki ? { ...initialState.bkki, ...payload?.bkki } : initialState.bkki,
    socialMedia: initialState.socialMedia ? { ...initialState.socialMedia, ...payload?.socialMedia } : initialState.socialMedia,
    aduan: initialState.aduan ? { ...initialState.aduan, ...payload?.aduan } : initialState.aduan,
    pr: initialState.pr ? { ...initialState.pr, ...payload?.pr } : initialState.pr,
    bpnp: initialState.bpnp ? { ...initialState.bpnp, ...payload?.bpnp } : initialState.bpnp,
    bksk: initialState.bksk ? { ...initialState.bksk, ...payload?.bksk } : initialState.bksk,
    hr: initialState.hr ? { ...initialState.hr, ...payload?.hr } : initialState.hr,
    bksp: initialState.bksp ? { ...initialState.bksp, ...payload?.bksp } : initialState.bksp,
    ukoko: initialState.ukoko ? { ...initialState.ukoko, ...payload?.ukoko } : initialState.ukoko,
    dhqc: initialState.dhqc ? { ...initialState.dhqc, ...payload?.dhqc } : initialState.dhqc,
    upp: initialState.upp ? { ...initialState.upp, ...payload?.upp } : initialState.upp,
    integriti: initialState.integriti ? { ...initialState.integriti, ...payload?.integriti } : initialState.integriti,
    quality: initialState.quality ? { ...initialState.quality, ...payload?.quality } : initialState.quality,
    penerbitan: initialState.penerbitan ? { ...initialState.penerbitan, ...payload?.penerbitan } : initialState.penerbitan,
  }), [initialState]);

  useEffect(() => {
    latestFormDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    let savedData: string | null = null;
    let isCancelled = false;

    const applyIncomingDraft = (payload: any) => {
      const merged = mergeWithInitialState(payload);
      const snapshot = JSON.stringify(merged);
      lastRemoteSnapshotRef.current = snapshot;
      isApplyingRemoteRef.current = true;
      latestFormDataRef.current = merged;
      setSaveError(null);
      setRawFormData(merged);

      try {
        localStorage.setItem(storageKey, JSON.stringify(merged));
      } catch (storageError) {
        console.error('Error caching incoming data locally', storageError);
      }

      window.setTimeout(() => {
        isApplyingRemoteRef.current = false;
      }, 0);
    };

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
        applyIncomingDraft(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }

    if (!isSupabaseConfigured) {
      return () => {
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
        if (remoteSyncTimeoutRef.current) {
          window.clearTimeout(remoteSyncTimeoutRef.current);
        }
      };
    }

    fetchRemoteDraft(storageKey)
      .then((remoteDraft) => {
        if (isCancelled || !remoteDraft?.data) return;

        const remoteSnapshot = JSON.stringify(normalizeZeroValuesForInputs(remoteDraft.data));
        if (remoteSnapshot === lastRemoteSnapshotRef.current) return;
        applyIncomingDraft(remoteDraft.data);
      })
      .catch((error) => {
        console.error('Error loading remote draft', error);
        if (!isCancelled) {
          setSaveError('Supabase tidak dapat dihubungi. App masih menggunakan simpanan lokal buat sementara.');
        }
      });

    const channel = subscribeToRemoteDraft(storageKey, (remoteDraft) => {
      if (isCancelled || !remoteDraft?.data) return;

      const nextSnapshot = JSON.stringify(normalizeZeroValuesForInputs(remoteDraft.data));
      const currentSnapshot = JSON.stringify(normalizeZeroValuesForInputs(latestFormDataRef.current));

      if (nextSnapshot === currentSnapshot || nextSnapshot === lastRemoteSnapshotRef.current) {
        return;
      }

      applyIncomingDraft(remoteDraft.data);
    });

    return () => {
      isCancelled = true;
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
      if (autoSaveTimeoutRef.current) {
        window.clearTimeout(autoSaveTimeoutRef.current);
      }
      if (autoSaveIndicatorTimeoutRef.current) {
        window.clearTimeout(autoSaveIndicatorTimeoutRef.current);
      }
      if (remoteSyncTimeoutRef.current) {
        window.clearTimeout(remoteSyncTimeoutRef.current);
      }
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
      void unsubscribeFromRemoteDraft(channel);
    };
  }, [deptName, mergeWithInitialState, storageKey]);

  const setFormData = useCallback((value: any) => {
    setRawFormData((prev: any) => {
      const next = typeof value === 'function' ? value(prev) : value;
      return normalizeZeroValuesForInputs(next);
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
    if (remoteSyncTimeoutRef.current) {
      window.clearTimeout(remoteSyncTimeoutRef.current);
    }

    if (isApplyingRemoteRef.current) {
      return;
    }

    autoSaveTimeoutRef.current = window.setTimeout(() => {
      try {
        setIsAutoSaving(true);
        localStorage.setItem(storageKey, JSON.stringify(formData));
      } catch (error) {
        console.error('Error auto-saving data', error);
        setIsAutoSaving(false);
        setSaveError('Simpanan lokal gagal. Sila semak storage pelayar anda.');
        return;
      }

      if (!isSupabaseConfigured) {
        autoSaveIndicatorTimeoutRef.current = window.setTimeout(() => setIsAutoSaving(false), 500);
        return;
      }

      remoteSyncTimeoutRef.current = window.setTimeout(async () => {
        try {
          const saved = await upsertRemoteDraft(storageKey, deptName, formData);
          lastRemoteSnapshotRef.current = JSON.stringify(normalizeZeroValuesForInputs(saved?.data || formData));
          setSaveError(null);
        } catch (error) {
          console.error('Error auto-saving data to Supabase', error);
          setSaveError('Sambungan Supabase gagal. Data masih disimpan secara lokal pada peranti ini.');
        } finally {
          autoSaveIndicatorTimeoutRef.current = window.setTimeout(() => setIsAutoSaving(false), 500);
        }
      }, 150);
    }, 1200); // Debounce delay 1.2s

    return () => {
      if (autoSaveTimeoutRef.current) {
        window.clearTimeout(autoSaveTimeoutRef.current);
      }
      if (remoteSyncTimeoutRef.current) {
        window.clearTimeout(remoteSyncTimeoutRef.current);
      }
      if (autoSaveIndicatorTimeoutRef.current) {
        window.clearTimeout(autoSaveIndicatorTimeoutRef.current);
      }
    };
  }, [formData, storageKey]);

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
    saveTimeoutRef.current = window.setTimeout(async () => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(payload));
        if (isSupabaseConfigured) {
          const saved = await upsertRemoteDraft(storageKey, deptName, payload);
          lastRemoteSnapshotRef.current = JSON.stringify(normalizeZeroValuesForInputs(saved?.data || payload));
        }
        setShowSuccess(true);
        successTimeoutRef.current = window.setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error('Error saving data', error);
        setShowSuccess(false);
        setSaveError(
          isSupabaseConfigured
            ? 'Data tidak dapat disimpan ke Supabase. Sila semak URL, publishable key, atau setup table/policy.'
            : 'Data tidak dapat disimpan ke localStorage. Sila kosongkan ruang storan pelayar atau tutup mod private/incognito.'
        );
      } finally {
        setIsSaving(false);
      }
    }, 800);
  };

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
