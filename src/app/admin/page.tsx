'use client';

import { useState } from 'react';
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import AdminPanel from '@/components/admin-panel';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'; // Change this!

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('adminAuth');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black">
        <div className="flex items-center justify-between p-4 border-b border-emerald-500/20 bg-black/50">
          <h1 className="text-xl font-bold text-emerald-400">Kairos AI Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all text-sm"
          >
            Logout
          </button>
        </div>
        <AdminPanel isOpen={true} onClose={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black flex items-center justify-center p-4">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent opacity-40" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/60 border border-emerald-500/30 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4">
              <Lock className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-slate-400">Kairos AI Management Panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-emerald-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
            >
              Access Admin Panel
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-emerald-500/20">
            <p className="text-xs text-slate-400 text-center">
              🔒 This page is protected. Only authorized personnel should access this area.
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-slate-400 text-xs mt-6">
          Kairos AI Admin • Secure Access
        </p>
      </div>
    </div>
  );
}
