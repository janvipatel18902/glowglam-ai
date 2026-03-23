import Link from 'next/link';

import { Container } from '@/components/layout/container/Container';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthCard } from '@/components/ui/AuthCard';

export default function LoginPage() {
    return (
        <div className="min-h-screen text-slate-800">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.10),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_24%)]" />

                <Container className="relative py-12 sm:py-16 lg:py-20">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        <div className="order-2 lg:order-1">
                            <div className="max-w-xl">
                                <span className="inline-flex rounded-full border border-[#eadff0] bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-fuchsia-600 shadow-sm sm:text-xs">
                                    Welcome Back
                                </span>

                                <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-800 sm:text-5xl">
                                    Continue your smart skincare journey
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                                    Access your skin analysis history, AI beauty assistant,
                                    personalized dashboard, and saved product recommendations.
                                </p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                    {[
                                        'AI skin insights',
                                        'Personal dashboard',
                                        'Saved beauty picks',
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

                        <div className="order-1 mx-auto w-full max-w-md lg:order-2">
                            <AuthCard
                                title="Login"
                                subtitle="Sign in to access your dashboard, chat history, and skin analysis results."
                            >
                                <form className="space-y-4">
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
                                        placeholder="Enter your password"
                                        required
                                    />

                                    <div className="flex items-center justify-between gap-4 text-sm">
                                        <label className="flex items-center gap-2 text-slate-500">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-[#d9cfe3] bg-white"
                                            />
                                            Remember me
                                        </label>

                                        <Link
                                            href="/forgot-password"
                                            className="text-fuchsia-600 transition hover:text-fuchsia-700"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    <Button className="w-full">Login</Button>

                                    <p className="text-center text-sm text-slate-500">
                                        Don&apos;t have an account?{' '}
                                        <Link
                                            href="/signup"
                                            className="font-medium text-fuchsia-600 transition hover:text-fuchsia-700"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </form>
                            </AuthCard>
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}