import { useState, useEffect } from 'react';

export const useFormLogic = (deptName: string, initialState: any) => {
  const [formData, setFormData] = useState<any>(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(`jais_2025_${deptName}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
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
  }, [deptName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = (dataToSave?: any) => {
    const payload = dataToSave ?? formData;
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem(`jais_2025_${deptName}`, JSON.stringify(payload));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
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
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan
  };
};
