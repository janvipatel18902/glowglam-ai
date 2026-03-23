import Link from 'next/link';

import { Container } from '@/components/layout/container/Container';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthCard } from '@/components/ui/AuthCard';

export default function SignupPage() {
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
                                <form className="space-y-4">
                                    <Input
                                        label="Full Name"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        required
                                    />

                                    <Input
                                        label="Email Address"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    />

                                    <Input
                                        label="Password"
                                        type="password"
                                        name="password"
                                        placeholder="Create a password"
                                        helperText="Use at least 8 characters for a stronger password."
                                        required
                                    />

                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        required
                                    />

                                    <label className="flex items-start gap-3 text-sm leading-6 text-slate-500">
                                        <input
                                            type="checkbox"
                                            className="mt-1 h-4 w-4 rounded border-[#d9cfe3] bg-white"
                                        />
                                        <span>
                                            I agree to the terms and privacy policy of GlowGlam AI.
                                        </span>
                                    </label>

                                    <Button className="w-full">Create Account</Button>

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