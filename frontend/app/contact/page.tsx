'use client';

import { useState } from 'react';
import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';
import { createContactSubmission } from '@/lib/contact-api';

export default function ContactPage() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setSubmitted(false);
        setError('');

        try {
            await createContactSubmission(form);

            setSubmitted(true);
            setForm({
                fullName: '',
                email: '',
                message: '',
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen text-slate-800">
            <Navbar />

            <main className="bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]">
                <Container className="py-14 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <MotionFade>
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#eadff0] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                                <span className="text-violet-500">✦</span>
                                Contact Us
                            </span>
                        </MotionFade>

                        <MotionFade delay={0.08}>
                            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
                                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                                    Let&apos;s Connect
                                </span>
                            </h1>
                        </MotionFade>

                        <MotionFade delay={0.16}>
                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                                Have a question, partnership idea, or feedback? Send us a
                                message.
                            </p>
                        </MotionFade>
                    </div>

                    <MotionFade delay={0.24}>
                        <div className="mx-auto mt-12 max-w-2xl rounded-[1.5rem] border border-[#eadff0] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-8">
                            {submitted ? (
                                <div className="mb-5 rounded-[1rem] border border-green-200 bg-green-50 p-4 text-center">
                                    <h3 className="text-lg font-semibold text-green-700">
                                        Message sent successfully
                                    </h3>
                                    <p className="mt-2 text-sm text-green-700/80">
                                        Thanks for reaching out. We&apos;ll get back to you soon.
                                    </p>
                                </div>
                            ) : null}

                            {error ? (
                                <div className="mb-5 rounded-[1rem] border border-red-200 bg-red-50 p-4 text-center">
                                    <h3 className="text-lg font-semibold text-red-700">
                                        Failed to send message
                                    </h3>
                                    <p className="mt-2 text-sm text-red-700/80">{error}</p>
                                </div>
                            ) : null}

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Full Name
                                    </label>
                                    <input
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full rounded-2xl border border-[#eadff0] bg-white px-4 text-sm text-slate-700 outline-none"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full rounded-2xl border border-[#eadff0] bg-white px-4 text-sm text-slate-700 outline-none"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full rounded-2xl border border-[#eadff0] bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                                        placeholder="Tell us how we can help"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-70"
                                >
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </MotionFade>
                </Container>
            </main>

            <Footer />
        </div>
    );
}