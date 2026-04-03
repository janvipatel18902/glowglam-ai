'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Container } from '@/components/layout/container/Container';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { Button } from '@/components/ui/Button';
import { AuthCard } from '@/components/ui/AuthCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      router.replace('/dashboard');
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!agree) {
      setError('Please accept the terms and privacy policy.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(', ')
            : data?.message || 'Signup failed',
        );
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('auth-changed'));

      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)] text-slate-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.10),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_24%)]" />

        <Container className="relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="mx-auto w-full max-w-md">
              <AuthCard
                title="Create Account"
                subtitle="Join GlowGlam AI and start your personalized skincare experience."
              >
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-[#eadff0] bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-pink-400/60"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-[#eadff0] bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-pink-400/60"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-[#eadff0] bg-white px-4 py-3 pr-20 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-pink-400/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-fuchsia-600 transition hover:text-fuchsia-700"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Use at least 6 characters for a stronger password.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-[#eadff0] bg-white px-4 py-3 pr-20 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-pink-400/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-fuchsia-600 transition hover:text-fuchsia-700"
                      >
                        {showConfirmPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-sm leading-6 text-slate-500">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#d9cfe3] bg-white"
                    />
                    <span>
                      I agree to the terms and privacy policy of GlowGlam AI.
                    </span>
                  </label>

                  {error ? (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                  ) : null}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="font-medium text-fuchsia-600 transition hover:text-fuchsia-700"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </AuthCard>
            </div>

            <div className="max-w-xl">
              <span className="inline-flex rounded-full border border-[#eadff0] bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-fuchsia-600 shadow-sm sm:text-xs">
                Start Your Glow
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-800 sm:text-5xl">
                Build your personalized AI beauty profile
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                Create your account to unlock facial skin analysis, AI beauty
                chat, product recommendations, and a dashboard built for your
                skincare routine.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Upload skin images and track analysis history',
                  'Get personalized recommendations from AI',
                  'Save products and manage your skincare routine',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#eadff0] bg-white p-4 text-sm text-slate-600 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}