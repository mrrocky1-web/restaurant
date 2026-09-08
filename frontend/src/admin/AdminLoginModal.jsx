import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Crown,
  Lock,
  Mail,
  User,
  ShieldAlert,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  ShieldCheck
} from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose }) => {
  const { loginAdmin, registerAdmin, setCurrentView } = useStore();

  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('admin@fashionvillaroyal.com');
  const [loginPassword, setLoginPassword] = useState('admin123');

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPass, setSignUpConfirmPass] = useState('');
  const [signUpRole, setSignUpRole] = useState('Inventory Manager');
  const [masterKey, setMasterKey] = useState('ROYAL-ADMIN-2026');

  // Feedback State
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = loginAdmin(loginEmail, loginPassword);
    if (res.success) {
      onClose();
      setCurrentView('admin-dashboard');
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (signUpPassword !== signUpConfirmPass) {
      setErrorMsg('Passwords do not match. Please re-enter confirm password.');
      return;
    }

    if (signUpPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    const res = registerAdmin({
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      role: signUpRole,
      masterKey
    });

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        onClose();
        setCurrentView('admin-dashboard');
      }, 1200);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleDemoFill = () => {
    setLoginEmail('admin@fashionvillaroyal.com');
    setLoginPassword('admin123');
    const res = loginAdmin('admin@fashionvillaroyal.com', 'admin123');
    if (res.success) {
      onClose();
      setCurrentView('admin-dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl p-8 space-y-6 relative my-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 mx-auto flex items-center justify-center shadow-lg">
            <Crown className="w-7 h-7" />
          </div>
          <h2 className="font-cinzel text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            ADMIN PORTAL DATABASE
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {mode === 'login'
              ? 'Authenticate to manage inventory, variant prices & orders.'
              : 'Register a new admin account in the Fashionvillaroyal Database.'}
          </p>
        </div>

        {/* Mode Selector Tabs: Sign In vs Sign Up */}
        <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              mode === 'login'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>🔐 Admin Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              mode === 'signup'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>➕ Register Admin</span>
          </button>
        </div>

        {/* Feedback Banners */}
        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500 text-rose-500 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form 1: LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Admin Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@fashionvillaroyal.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-xl uppercase tracking-widest text-xs shadow-lg transition-all"
            >
              Sign In to Admin Desk
            </button>

            {/* Quick Demo Login */}
            <div className="pt-3 border-t border-gray-100 dark:border-slate-800 text-center space-y-2">
              <p className="text-[11px] text-gray-400">Default Super Admin Credentials:</p>
              <button
                type="button"
                onClick={handleDemoFill}
                className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-amber-500/30 transition-all"
              >
                <KeyRound className="w-4 h-4" />
                <span>⚡ One-Click Demo Admin Login</span>
              </button>
            </div>
          </form>
        ) : (
          /* Form 2: SIGN UP / REGISTRATION FORM */
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="e.g. Maharani Devika"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Admin Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="devika@fashionvillaroyal.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Confirm Pass *
                </label>
                <input
                  type="password"
                  value={signUpConfirmPass}
                  onChange={(e) => setSignUpConfirmPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Admin Role
                </label>
                <select
                  value={signUpRole}
                  onChange={(e) => setSignUpRole(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold"
                >
                  <option value="Inventory Manager">Inventory Manager</option>
                  <option value="Order Desk Manager">Order Desk Manager</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Sales Admin">Sales Admin</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Master Admin Key *
                </label>
                <input
                  type="text"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-amber-500/50 rounded-xl font-mono font-bold text-amber-600"
                />
              </div>
            </div>
            <p className="text-[10px] text-gray-400 italic">
              🔑 Default Security Key: <strong className="text-amber-500 font-mono">ROYAL-ADMIN-2026</strong>
            </p>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-xl uppercase tracking-widest text-xs shadow-lg transition-all"
            >
              Register Account & Open Database
            </button>
          </form>
        )}

        <button
          onClick={onClose}
          className="w-full text-center text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          Cancel & Return to Store
        </button>
      </div>
    </div>
  );
};
