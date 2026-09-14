// app/login/page.tsx
'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 5 Company Logos ki list
const companyLogos = [
  '/baco.logo.webp',
  '/ict.webp',
  '/ictbs.png',
  '/ictuk.png',
  '/idt.logo.png',
];

// Right side wala Single Flipping Logos Circle
function FlippingLogosCircle() {
  const [logoIndex, setLogoIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev); // Flip trigger
      setTimeout(() => {
        setLogoIndex((prev) => (prev + 1) % companyLogos.length);
      }, 350); // Adhe flip par logo change hoga
    }, 2000); // 2 seconds interval

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-40 h-40 sm:w-80 sm:h-80 [perspective:1000px] flex items-center justify-center">
      <div
        className={`w-full h-full rounded-full bg-[#E0E0E0] shadow-[-12px_-12px_35px_#FFFFFF,12px_12px_35px_#BEBEBE] flex items-center justify-center p-12 transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        }`}
      >
        <img
          src={companyLogos[logoIndex]}
          alt="Company Logo"
          className={`w-full h-full object-contain transition-transform duration-700 ${
            isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
          }`}
        />
      </div>
    </div>
  );
}

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
        setIsFlipped(false);
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
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 bg-[#E0E0E0] p-6 font-sans">
      
      {/* ================= LEFT SIDE: LOGIN / REGISTER CIRCLE (Bara kar diya hai) ================= */}
      <div className="w-100 h-100 sm:w-120 sm:h-120 [perspective:1000px]">
        <div 
          className={`relative w-full h-full rounded-full transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front: Login */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-[#E0E0E0] flex items-center justify-center shadow-[-12px_-12px_35px_#FFFFFF,12px_12px_35px_#BEBEBE] [backface-visibility:hidden]">
            <div className="w-[72%] text-center">
              <h1 className="text-2xl font-bold text-[#333333] mb-1">Login</h1>
              <p className="text-[#666666] mb-4 text-xs">Sign in to your account</p>

              <form onSubmit={handleLogin} className="space-y-3">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#777777]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Username"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#E0E0E0] text-[#333333] text-xs placeholder:text-[#AAAAAA] shadow-[inset_4px_4px_8px_#BEBEBE,inset_-4px_-4px_8px_#FFFFFF] focus:outline-none border-none"
                  />
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#D05060]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#E0E0E0] text-[#333333] text-xs placeholder:text-[#AAAAAA] shadow-[inset_4px_4px_8px_#BEBEBE,inset_-4px_-4px_8px_#FFFFFF] focus:outline-none border-none"
                  />
                </div>

                {error && <p className="text-red-500 text-[10px] text-center bg-red-100 p-1 rounded">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-2xl text-center font-semibold uppercase tracking-wider text-xs text-[#444444] bg-[#E0E0E0] shadow-[4px_4px_8px_#BEBEBE,-4px_-4px_8px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#BEBEBE,inset_-4px_-4px_8px_#FFFFFF] active:scale-[0.98] transition-all duration-150 cursor-pointer"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <p className="mt-3 text-[11px] text-[#666666]">
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

          {/* Back: Register */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-[#E0E0E0] flex items-center justify-center shadow-[-12px_-12px_35px_#FFFFFF,12px_12px_35px_#BEBEBE] [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="w-[72%] text-center">
              <h1 className="text-2xl font-bold text-[#333333] mb-1">Register</h1>
              <p className="text-[#666666] mb-3 text-xs">Create a new account</p>

              <form onSubmit={handleSignup} className="space-y-2">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#777777]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-3 py-2 rounded-2xl bg-[#E0E0E0] text-[#333333] text-xs placeholder:text-[#AAAAAA] shadow-[inset_4px_4px_8px_#BEBEBE,inset_-4px_-4px_8px_#FFFFFF] focus:outline-none border-none"
                  />
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#D05060]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-3 py-2 rounded-2xl bg-[#E0E0E0] text-[#333333] text-xs placeholder:text-[#AAAAAA] shadow-[inset_4px_4px_8px_#BEBEBE,inset_-4px_-4px_8px_#FFFFFF] focus:outline-none border-none"
                  />
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#D05060]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-3 py-2 rounded-2xl bg-[#E0E0E0] text-[#333333] text-xs placeholder:text-[#AAAAAA] shadow-[inset_4px_4px_8px_#BEBEBE,inset_-4px_-4px_8px_#FFFFFF] focus:outline-none border-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-2xl text-center font-semibold uppercase tracking-wider text-xs text-[#444444] bg-[#E0E0E0] shadow-[4px_4px_8px_#BEBEBE,-4px_-4px_8px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#BEBEBE,inset_-4px_-4px_8px_#FFFFFF] active:scale-[0.98] transition-all duration-150 cursor-pointer"
                >
                  Sign Up
                </button>
              </form>

              <p className="mt-3 text-[11px] text-[#666666]">
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

      {/* ================= RIGHT SIDE: SINGLE CLEAN FLIPPING LOGOS CIRCLE ================= */}
      <FlippingLogosCircle />

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