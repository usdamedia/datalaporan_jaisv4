import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { normalizeZeroValuesForInputs } from '../../utils/inputNormalization';
import { buildDraftKey } from '../../utils/formDraftKey';

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
  const storageKey = useMemo(() => buildDraftKey(deptName), [deptName]);

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

  useEffect(() => {
    initialStateRef.current = normalizeZeroValuesForInputs(initialState);
    let savedData: string | null = null;

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
        setSaveError(null);
        setRawFormData(mergeWithInitialState(JSON.parse(savedData)));
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }

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
    saveTimeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(payload));
        setShowSuccess(true);
        successTimeoutRef.current = window.setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error('Error saving data', error);
        setShowSuccess(false);
        setSaveError('Data tidak dapat disimpan ke localStorage. Sila kosongkan ruang storan pelayar atau tutup mod private/incognito.');
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
