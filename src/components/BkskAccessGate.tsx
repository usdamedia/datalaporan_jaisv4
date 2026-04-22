import React, { useEffect, useState } from 'react';
import { AlertCircle, LockKeyhole, ShieldCheck } from 'lucide-react';
import BkskForm from './forms/BkskForm';
import { sha256Hex } from '../utils/sha256';

interface BkskAccessGateProps {
  deptName: string;
  onBack: () => void;
}

const BKSK_ACCESS_STORAGE_KEY = 'jais_bksk_access_granted_2025';
const BKSK_PASSWORD_HASH = '95b93c2ace3050b7c5760fe5dce575d4f3baaf3f2d4c29a8408c1934d915471a';

const BkskAccessGate: React.FC<BkskAccessGateProps> = ({ deptName, onBack }) => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(BKSK_ACCESS_STORAGE_KEY) === 'granted') {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password.trim()) {
      setError('Sila masukkan kata laluan.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const passwordHash = await sha256Hex(password);

      if (passwordHash !== BKSK_PASSWORD_HASH) {
        setError('Kata laluan tidak tepat.');
        return;
      }

      sessionStorage.setItem(BKSK_ACCESS_STORAGE_KEY, 'granted');
      setIsUnlocked(true);
      setPassword('');
    } catch (submitError) {
      console.error('BKSK access validation failed', submitError);
      setError('Semakan kata laluan gagal. Sila cuba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUnlocked) {
    return <BkskForm deptName={deptName} onBack={onBack} />;
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-in pb-24">
      <div className="rounded-[2rem] border border-teal-100 bg-[linear-gradient(135deg,#042f2e_0%,#0f766e_45%,#155e75_100%)] p-8 text-white shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <LockKeyhole className="h-7 w-7" />
        </div>
        <p className="mt-6 text-[11px] font-black uppercase tracking-[0.3em] text-teal-100">Akses Terhad</p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">Bahagian Kemajuan Saudara Kita (BKSK)</h1>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-teal-50">
          Masukkan kata laluan untuk membuka halaman BKSK. Akses yang berjaya akan disimpan untuk sesi semasa sahaja.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <ShieldCheck className="mt-0.5 h-5 w-5" />
          <p className="text-sm font-semibold leading-6">
            Kata laluan tidak disimpan sebagai plaintext dalam kod. Semakan dibuat menggunakan hash pada pelayar.
          </p>
        </div>

        <label className="mt-8 block">
          <span className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">Kata Laluan BKSK</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Masukkan kata laluan"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-semibold text-slate-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          />
        </label>

        {error && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-h-[56px] flex-1 items-center justify-center rounded-[1.2rem] bg-zus-900 px-6 py-4 text-base font-black text-white shadow-[0_18px_40px_rgba(15,35,64,0.18)] transition hover:bg-zus-800 disabled:opacity-70"
          >
            {isSubmitting ? 'Menyemak...' : 'Masuk BKSK'}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex min-h-[56px] flex-1 items-center justify-center rounded-[1.2rem] border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
};

export default BkskAccessGate;
