import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@naturalmantra.com');
  const [password, setPassword] = useState('Admin@123456');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res?.success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <img src="/assets/natural-mantra-logo.svg" alt="Natural Mantra" className="h-12 w-auto mx-auto brightness-200" />
          <h1 className="text-xl font-bold text-white uppercase tracking-wider">Admin Portal Login</h1>
          <p className="text-xs text-gray-400">Natural Mantra E-Commerce & CMS Control Panel</p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 rounded-xl text-xs font-bold flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-300 block mb-1">Admin Email *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-300 block mb-1">Admin Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div className="p-3 bg-gray-800/60 rounded-xl border border-gray-700 text-[11px] text-gray-400 font-mono">
            <span>Default Seed Credentials:</span>
            <div className="text-brand-gold mt-1">Email: admin@naturalmantra.com</div>
            <div className="text-brand-gold">Pass: Admin@123456</div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-brand-gold hover:bg-brand-goldHover text-brand-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            SIGN IN TO DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
