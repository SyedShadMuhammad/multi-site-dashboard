// app/login/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';

function AuthContent() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Login states
  const [loginEmail, setLoginEmail] = useState('admin@multisite.com');
  const [loginPassword, setLoginPassword] = useState('admin123');

  // Signup states
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Account created successfully! Please sign in.');
        setIsFlipped(false); // Wapis login page par le aaye ga
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch {
      setError('Something went wrong during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0E0E0] p-4 font-sans [perspective:1000px]">
      
      {/* 3D Flipping Circle Container */}
      <div 
        className={`relative w-full max-w-lg aspect-square rounded-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        
        {/* ================= FRONT SIDE: LOGIN ================= */}
        <div className="absolute inset-0 w-full h-full rounded-full bg-[#E0E0E0] flex items-center justify-center shadow-[-12px_-12px_35px_#FFFFFF,12px_12px_35px_#BEBEBE] [backface-visibility:hidden]">
          <div className="w-[75%] text-center">
            <h1 className="text-4xl font-bold text-[#333333] mb-1">Login</h1>
            <p className="text-[#666666] mb-6 text-sm">Sign in to your account</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#777777]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#E0E0E0] text-[#333333] text-sm placeholder:text-[#AAAAAA] shadow-[inset_5px_5px_10px_#BEBEBE,inset_-5px_-5px_10px_#FFFFFF] focus:outline-none border-none"
                />
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#D05060]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#E0E0E0] text-[#333333] text-sm placeholder:text-[#AAAAAA] shadow-[inset_5px_5px_10px_#BEBEBE,inset_-5px_-5px_10px_#FFFFFF] focus:outline-none border-none"
                />
              </div>

              {error && <p className="text-red-500 text-xs text-center bg-red-100 p-1.5 rounded">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl text-center font-semibold uppercase tracking-wider text-sm text-[#444444] bg-[#E0E0E0] shadow-[5px_5px_10px_#BEBEBE,-5px_-5px_10px_#FFFFFF] hover:shadow-[inset_5px_5px_10px_#BEBEBE,inset_-5px_-5px_10px_#FFFFFF] active:scale-[0.98] transition-all duration-150"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-5 text-xs text-[#666666]">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => { setIsFlipped(true); setError(''); }}
                className="font-semibold text-[#D05060] hover:underline focus:outline-none cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>


        {/* ================= BACK SIDE: SIGNUP ================= */}
        <div className="absolute inset-0 w-full h-full rounded-full bg-[#E0E0E0] flex items-center justify-center shadow-[-12px_-12px_35px_#FFFFFF,12px_12px_35px_#BEBEBE] [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="w-[75%] text-center">
            <h1 className="text-4xl font-bold text-[#333333] mb-1">Register</h1>
            <p className="text-[#666666] mb-5 text-sm">Create a new account</p>

            <form onSubmit={handleSignup} className="space-y-3.5">
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#777777]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#E0E0E0] text-[#333333] text-sm placeholder:text-[#AAAAAA] shadow-[inset_5px_5px_10px_#BEBEBE,inset_-5px_-5px_10px_#FFFFFF] focus:outline-none border-none"
                />
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#D05060]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#E0E0E0] text-[#333333] text-sm placeholder:text-[#AAAAAA] shadow-[inset_5px_5px_10px_#BEBEBE,inset_-5px_-5px_10px_#FFFFFF] focus:outline-none border-none"
                />
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#D05060]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#E0E0E0] text-[#333333] text-sm placeholder:text-[#AAAAAA] shadow-[inset_5px_5px_10px_#BEBEBE,inset_-5px_-5px_10px_#FFFFFF] focus:outline-none border-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-center font-semibold uppercase tracking-wider text-sm text-[#444444] bg-[#E0E0E0] shadow-[5px_5px_10px_#BEBEBE,-5px_-5px_10px_#FFFFFF] hover:shadow-[inset_5px_5px_10px_#BEBEBE,inset_-5px_-5px_10px_#FFFFFF] active:scale-[0.98] transition-all duration-150"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-xs text-[#666666]">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => setIsFlipped(false)}
                className="font-semibold text-[#D05060] hover:underline focus:outline-none cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#E0E0E0]">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}