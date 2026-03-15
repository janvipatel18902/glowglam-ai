import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/container/Container';

const features = [
  {
    title: 'Smart Skin Test',
    description:
      'Upload your photo and get AI-powered skin insights with a guided and elegant analysis flow.',
  },
  {
    title: 'AI Beauty Chat',
    description:
      'Ask skincare questions anytime and receive tailored recommendations and beauty guidance.',
  },
  {
    title: 'Product Discovery',
    description:
      'Explore skincare products and brands matched to your goals, concerns, and skin profile.',
  },
  {
    title: 'Personal Dashboard',
    description:
      'Track your history, save favorites, and manage your skincare journey in one place.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.30),transparent_30%),radial-gradient(circle_at_right,rgba(168,85,247,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_24%)]" />
          <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl sm:h-96 sm:w-96" />

          <Container className="relative py-16 sm:py-20 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="text-center lg:text-left">
                <span className="inline-flex rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-pink-200 sm:text-xs">
                  AI-Powered Skincare Platform
                </span>

                <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  Discover Your
                  <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                    Perfect Glow
                  </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:mx-0 lg:text-lg">
                  Upload your skin image, get smart facial analysis, explore
                  skincare products, and chat with an AI beauty assistant built
                  to guide your daily routine.
                </p>

                <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button href="/skin-test" className="w-full sm:w-auto">
                    Start Skin Analysis
                  </Button>

                  <Button
                    href="/ai-chat"
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Chat with AI
                  </Button>
                </div>

                <div className="mt-8 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
                    Smart facial scan
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                    AI skincare chat
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                    Personalized recommendations
                  </div>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-pink-500/20 blur-2xl sm:h-32 sm:w-32" />
                <div className="absolute -right-4 bottom-8 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl sm:h-32 sm:w-32" />

                <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-pink-500/10 backdrop-blur-xl sm:p-6">
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                          Glow Scan
                        </p>
                        <h2 className="mt-2 text-lg font-semibold sm:text-xl">
                          Skin Analysis Preview
                        </h2>
                      </div>
                      <div className="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs font-medium text-pink-200">
                        Live AI
                      </div>
                    </div>

                    <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5">
                      <div className="mx-auto flex h-52 w-40 items-center justify-center rounded-[999px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.22),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] sm:h-64 sm:w-48">
                        <div className="relative h-36 w-24 rounded-[999px] border border-pink-200/20 bg-white/5 sm:h-44 sm:w-28">
                          <div className="absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-pink-300/80 blur-[1px]" />
                          <div className="absolute left-5 top-12 h-2 w-2 rounded-full bg-white/60" />
                          <div className="absolute right-5 top-12 h-2 w-2 rounded-full bg-white/60" />
                          <div className="absolute left-1/2 top-20 h-10 w-8 -translate-x-1/2 rounded-full border border-pink-200/20" />
                          <div className="absolute left-1/2 top-28 h-1.5 w-10 -translate-x-1/2 rounded-full bg-pink-200/40" />
                          <div className="absolute left-3 top-16 h-12 w-12 rounded-full border border-pink-400/20" />
                          <div className="absolute right-3 top-20 h-10 w-10 rounded-full border border-violet-400/20" />
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            Skin Type
                          </p>
                          <p className="mt-2 text-base font-semibold">
                            Combination
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            AI Result
                          </p>
                          <p className="mt-2 text-base font-semibold">
                            Hydration Needed
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">Glow Score</span>
                          <span className="font-semibold text-pink-200">
                            86%
                          </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-400 to-violet-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-200/80">
                Core Features
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Everything you need for a smarter skincare journey
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                GlowGlam AI combines analysis, beauty guidance, product
                discovery, and personal tracking in one elegant platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-pink-400/20 hover:bg-white/8"
                >
                  <div className="mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br from-pink-500/20 to-violet-500/20" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}