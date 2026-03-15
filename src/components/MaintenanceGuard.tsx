import React, { useState, useEffect } from 'react';
import { Lock, Settings, AlertTriangle, Clock, ShieldCheck } from 'lucide-react';

interface MaintenanceGuardProps {
  children: React.ReactNode;
}

const MaintenanceGuard: React.FC<MaintenanceGuardProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds countdown
  const [timerFinished, setTimerFinished] = useState(false);

  const ADMIN_PASSWORD = 'bpnpj@is2026';

  useEffect(() => {
    const adminStatus = sessionStorage.getItem('is_admin_authenticated');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimerFinished(true);
    }
  }, [timeLeft]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      performLogin();
    } else {
      setError('Kata laluan tidak sah.');
    }
  };

  const performLogin = () => {
    setIsAdmin(true);
    sessionStorage.setItem('is_admin_authenticated', 'true');
    setError('');
  };

  if (isAdmin) {
    return (
      <>
        {children}
        {/* Subtle Admin Indicator */}
        <div className="fixed bottom-4 right-4 z-[9999] opacity-20 hover:opacity-100 transition-opacity">
          <div className="bg-zus-900 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-lg border border-zus-gold">
            <ShieldCheck className="w-3 h-3 text-zus-gold" />
            ADMIN MODE
            <button 
              onClick={() => {
                sessionStorage.removeItem('is_admin_authenticated');
                window.location.reload();
              }}
              className="ml-2 hover:text-zus-gold underline"
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-zus-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-zus-900/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-zus-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Settings className="w-10 h-10 text-zus-gold animate-spin-slow" />
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-zus-900 mb-6 leading-tight">
            Sistem Sedang Diselenggara Untuk Penambahbaikan oleh Urus Setia Laporan Tahunan JAIS
          </h1>

          <div className="bg-zus-900 text-white p-6 rounded-2xl mb-8 shadow-xl transform hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-zus-gold" />
              <p className="text-sm font-bold uppercase tracking-widest text-zus-gold">Jadual Penyelenggaraan</p>
            </div>
            <p className="text-lg md:text-xl font-medium">
              Sistem boleh diakses pada 16 Mac 2025 GMT 8 pada 8 pagi .
            </p>
          </div>

          <p className="text-gray-500 mb-12 italic">
            Terima kasih atas kesabaran anda. Kami sedang berusaha untuk memberikan pengalaman yang lebih baik.
          </p>

          {/* Countdown and Login Access */}
          <div className="flex flex-col items-center gap-4">
            {!timerFinished ? (
              <div className="flex items-center gap-2 text-zus-900 font-black text-sm uppercase tracking-widest bg-zus-gold/20 px-6 py-3 rounded-full animate-pulse">
                <Clock className="w-4 h-4" />
                Akses Terbuka Dalam: {timeLeft}s
              </div>
            ) : (
              <button 
                onClick={performLogin}
                className="bg-zus-gold text-zus-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:bg-zus-gold/80 active:scale-95 transition-all animate-bounce"
              >
                Masuk Tanpa Kata Laluan
              </button>
            )}

            {!showLogin ? (
              <button 
                onClick={() => setShowLogin(true)}
                className="text-gray-300 hover:text-gray-400 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold mt-4"
              >
                Admin Access (Manual)
              </button>
            ) : (
              <form onSubmit={handleLogin} className="max-w-xs mx-auto animate-fade-in-up w-full">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Kod Akses"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-zus-gold focus:ring-2 focus:ring-zus-gold/20 outline-none text-center font-bold transition-all"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className="mt-3 w-full bg-zus-900 text-white py-3 rounded-xl font-bold hover:bg-zus-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Log Masuk Admin
                  </button>
                </div>
                {error && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{error}</p>}
                <button 
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="mt-4 text-gray-400 text-[10px] uppercase font-bold"
                >
                  Batal
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-gray-400">
        <AlertTriangle className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Akses Terhad: Urus Setia Sahaja</span>
      </div>
    </div>
  );
};

export default MaintenanceGuard;
