'use client';

import { useMemo, useState } from 'react';

import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { Button } from '@/components/ui/Button';
import { SkinTestPreview } from '@/components/skin-test/SkinTestPreview';
import { SkinTestTips } from '@/components/skin-test/SkinTestTips';
import { UploadBox } from '@/components/skin-test/UploadBox';

export default function SkinTestPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const previewUrl = useMemo(() => {
        if (!selectedFile) return null;
        return URL.createObjectURL(selectedFile);
    }, [selectedFile]);

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_25%)]" />

                <Container className="relative py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-pink-200 sm:text-xs">
                            Smart Skin Test
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            Upload your image and begin your AI skin scan
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                            Get a beautiful, guided analysis experience with image preview,
                            upload tips, and AI-ready scan results.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                        <div className="space-y-6">
                            <UploadBox onImageSelect={setSelectedFile} />

                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                                            Ready to Analyze
                                        </p>
                                        <h2 className="mt-2 text-xl font-semibold text-white">
                                            Start AI Analysis
                                        </h2>
                                        <p className="mt-2 text-sm text-slate-300">
                                            Once your image is selected, the analysis flow can begin.
                                        </p>
                                    </div>

                                    <Button className="w-full sm:w-auto">
                                        Analyze Skin
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <SkinTestPreview imageUrl={previewUrl} />
                            <SkinTestTips />
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}