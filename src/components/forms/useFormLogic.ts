import { useEffect, useMemo, useRef, useState } from 'react';

export const useFormLogic = (deptName: string, initialState: any) => {
  const [formData, setFormData] = useState<any>(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);
  const successTimeoutRef = useRef<number | null>(null);
  const storageKey = useMemo(() => {
    const normalizedDeptName = deptName
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

    return `jais_2025_${normalizedDeptName || 'DEPARTMENT'}`;
  }, [deptName]);

  useEffect(() => {
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
        const parsed = JSON.parse(savedData);
        setSaveError(null);
        setFormData((prev: any) => ({
          ...prev,
          ...parsed,
          // Deep merge for specific objects if needed
          bpds: prev.bpds ? { ...prev.bpds, ...parsed.bpds } : prev.bpds,
          bkim: prev.bkim ? { ...prev.bkim, ...parsed.bkim } : prev.bkim,
          finance: prev.finance ? { ...prev.finance, ...parsed.finance } : prev.finance,
          leadership: prev.leadership ? { ...prev.leadership, ...parsed.leadership } : prev.leadership,
          transport: prev.transport ? { ...prev.transport, ...parsed.transport } : prev.transport,
          bkki: prev.bkki ? { ...prev.bkki, ...parsed.bkki } : prev.bkki,
          socialMedia: prev.socialMedia ? { ...prev.socialMedia, ...parsed.socialMedia } : prev.socialMedia,
          aduan: prev.aduan ? { ...prev.aduan, ...parsed.aduan } : prev.aduan,
          bpnp: prev.bpnp ? { ...prev.bpnp, ...parsed.bpnp } : prev.bpnp,
          hr: prev.hr ? { ...prev.hr, ...parsed.hr } : prev.hr,
          bksp: prev.bksp ? { ...prev.bksp, ...parsed.bksp } : prev.bksp,
          ukoko: prev.ukoko ? { ...prev.ukoko, ...parsed.ukoko } : prev.ukoko,
          dhqc: prev.dhqc ? { ...prev.dhqc, ...parsed.dhqc } : prev.dhqc,
          upp: prev.upp ? { ...prev.upp, ...parsed.upp } : prev.upp,
          integriti: prev.integriti ? { ...prev.integriti, ...parsed.integriti } : prev.integriti,
          quality: prev.quality ? { ...prev.quality, ...parsed.quality } : prev.quality,
        }));
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }

    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }

      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, [deptName, storageKey]);

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
    saveTimeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(payload));
        setShowSuccess(true);
        successTimeoutRef.current = window.setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error('Error saving data locally', error);
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
    showSuccess,
    saveError,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan
  };
};
