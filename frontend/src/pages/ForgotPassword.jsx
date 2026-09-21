import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Mail, ArrowLeft } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Note: wire this up to a real backend endpoint (e.g. POST /api/auth/forgot-password)
// once email delivery is configured. For now it simulates the request.
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    showToast('If an account exists for that email, a reset link has been sent.', 'info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-3">
            <HeartPulse className="text-white" size={28} />
          </div>
          <h1 className="text-xl font-bold text-textmain">Reset Your Password</h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="label-text">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field pl-10"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={sent}>
            {sent ? 'Reset Link Sent' : 'Send Reset Link'}
          </button>
        </form>

        <Link to="/login" className="flex items-center justify-center gap-1 text-sm text-primary mt-5 hover:underline">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
