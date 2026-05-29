import HeroAnimated from "@/components/HeroAnimated";
import MagneticCard from "@/components/MagneticCard";
import ParallaxPhoto from "@/components/ParallaxPhoto";
import PromiseTricolon from "@/components/PromiseTricolon";
import Reveal from "@/components/Reveal";
import ThePractice from "@/components/ThePractice";
import MaskedHeading from "@/components/motion/MaskedHeading";
import EyebrowUnderline from "@/components/motion/EyebrowUnderline";
import DividerDraw from "@/components/motion/DividerDraw";

export default function Home() {

  return (
    <div className="min-h-screen">
      <section className="relative block-red hero-bg-drift px-6 pt-56 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <HeroAnimated
            tagline={
              <>
                Product and design architect, enterprise strategist, #1 bestselling author, Oscar-nominated storyteller, and honest-to-goodness mystic. <strong>I help you design, build, and ship your dreams!</strong>
              </>
            }
          />
        </div>
      </section>

      <section id="the-promise" className="section-bone relative px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-12">
            <EyebrowUnderline className="mb-6">The Promise</EyebrowUnderline>
            <MaskedHeading as="h2" className="heading-display max-w-5xl">
              I help companies build validated and defensible products using my proprietary
              method, the Moat Manifesto.
            </MaskedHeading>
          </div>

          <Reveal className="mt-20 md:mt-28 mb-20 md:mb-28">
            <PromiseTricolon />
          </Reveal>

          <DividerDraw className="mb-20 md:mb-28" />

          <div className="mb-20 md:mb-28">
            <EyebrowUnderline className="mb-8">Who this is for</EyebrowUnderline>
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-5xl">
                <div>
                  <span
                    className="eyebrow inline-block mb-5 px-3 py-1.5"
                    style={{
                      color: 'var(--red-hero)',
                      border: '1px solid var(--red-hero)',
                      borderRadius: '9999px',
                    }}
                  >
                    Founders
                  </span>
                  <MaskedHeading as="h4" className="heading-display-sm mb-4">
                    Pre-seed and seed founders without dedicated product leadership.
                  </MaskedHeading>
                  <p className="body-base" style={{ opacity: 0.7 }}>
                    You've raised, maybe hired an engineer or a marketer, but no one owns
                    the product.
                  </p>
                </div>
                <div>
                  <span
                    className="eyebrow inline-block mb-5 px-3 py-1.5"
                    style={{
                      color: 'var(--red-hero)',
                      border: '1px solid var(--red-hero)',
                      borderRadius: '9999px',
                    }}
                  >
                    Producers
                  </span>
                  <MaskedHeading as="h4" className="heading-display-sm mb-4">
                    Holders of original or optioned story-world IP.
                  </MaskedHeading>
                  <p className="body-base" style={{ opacity: 0.7 }}>
                    You've got a great IP, but need defensible, evergreen franchise architecture.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <DividerDraw className="mb-20 md:mb-28" />

          <div>
            <EyebrowUnderline className="mb-6">What you get</EyebrowUnderline>
            <MaskedHeading as="h3" className="heading-display mb-6" lines={["Taste & Clarity."]} />
            <Reveal>
              <p className="body-base-lg max-w-3xl" style={{ opacity: 0.75 }}>
                The judgment to tell you what is wrong with your idea before you build it. The
                methodology to pressure-test what is right. The discipline to keep you on the
                line until the thing is real.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="the-practice" className="section-ink fade-from-bone relative px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 md:mb-20">
            <EyebrowUnderline className="mb-6">The Practice</EyebrowUnderline>
            <MaskedHeading
              as="h2"
              className="heading-display max-w-3xl"
              lines={["Three depths.", "One method."]}
            />
          </div>
          <Reveal>
            <ThePractice />
          </Reveal>
        </div>
      </section>

      <section id="case-studies" className="section-bone fade-from-ink relative px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 md:mb-20">
            <EyebrowUnderline className="mb-6">Case Studies</EyebrowUnderline>
            <MaskedHeading as="h2" className="heading-display max-w-3xl">
              End-to-end product design, development, and go-to-market.
            </MaskedHeading>
          </div>
          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            <MagneticCard href="/work/halalyouneed" className="group relative aspect-square overflow-hidden rounded-2xl block">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: "linear-gradient(135deg, #0d0303 0%, #4a0f0f 60%, #bb3535 100%)" }} />
              <img src="/images/work-halalyouneed.png" alt="HalalYouNeed" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(0, 0, 0, 0.85)" }} />
              <div className="hidden md:flex absolute inset-0 flex-col justify-center p-6 md:p-8">
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">HalalYouNeed</h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wide mt-2">Gamified Islamic Prayer App</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-3">Solo-shipped from concept to App Store. AI-native workflow. 60% free-to-paid conversion at launch.</p>
                  <div className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wide mt-5 transition-transform duration-200">
                    View Case Study <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                  </div>
                </div>
              </div>
              <Reveal amount={0.4} className="md:hidden absolute inset-x-0 bottom-0 px-5 pt-20 pb-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                <h3 className="text-white text-xl font-black uppercase tracking-tight leading-tight">HalalYouNeed</h3>
                <p className="text-white/80 text-[11px] font-bold uppercase tracking-wide mt-1">Gamified Islamic Prayer App</p>
                <p className="text-white/70 text-xs leading-snug mt-2">Solo-shipped to App Store. 60% free-to-paid at launch.</p>
              </Reveal>
            </MagneticCard>

            <MagneticCard href="/work/lumiii" className="group relative aspect-square overflow-hidden rounded-2xl block">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: "linear-gradient(135deg, #0d0520 0%, #2d1b69 60%, #5b21b6 100%)" }} />
              <img src="/images/work-lumiii.png" alt="Lumiii" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(0, 0, 0, 0.85)" }} />
              <div className="hidden md:flex absolute inset-0 flex-col justify-center p-6 md:p-8">
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">Lumiii</h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wide mt-2">Anime Brand & Gamified UNSDG Platform</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-3">Won 2022 World EdTech Startup Challenge. Evidence-based research via UCL. Raised $800K.</p>
                  <div className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wide mt-5 transition-transform duration-200">
                    View Case Study <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                  </div>
                </div>
              </div>
              <Reveal amount={0.4} className="md:hidden absolute inset-x-0 bottom-0 px-5 pt-20 pb-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                <h3 className="text-white text-xl font-black uppercase tracking-tight leading-tight">Lumiii</h3>
                <p className="text-white/80 text-[11px] font-bold uppercase tracking-wide mt-1">Anime Brand & Gamified UNSDG Platform</p>
                <p className="text-white/70 text-xs leading-snug mt-2">Won 2022 World EdTech Startup Challenge. Raised $800K.</p>
              </Reveal>
            </MagneticCard>

            <MagneticCard href="/work/ghost-flowers" className="group relative aspect-square overflow-hidden rounded-2xl block">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: "linear-gradient(135deg, #0f0e0d 0%, #292524 60%, #57534e 100%)" }} />
              <img src="/images/work-ghostflowers.png" alt="Ghost Flowers" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(0, 0, 0, 0.85)" }} />
              <div className="hidden md:flex absolute inset-0 flex-col justify-center p-6 md:p-8">
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">Ghost Flowers</h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wide mt-2">#1 Bestselling Book</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-3">Wrote, designed, built the website, optimised the Amazon listing, and ran the email campaign to a #1 debut.</p>
                  <div className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wide mt-5 transition-transform duration-200">
                    View Case Study <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                  </div>
                </div>
              </div>
              <Reveal amount={0.4} className="md:hidden absolute inset-x-0 bottom-0 px-5 pt-20 pb-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                <h3 className="text-white text-xl font-black uppercase tracking-tight leading-tight">Ghost Flowers</h3>
                <p className="text-white/80 text-[11px] font-bold uppercase tracking-wide mt-1">#1 Bestselling Book</p>
                <p className="text-white/70 text-xs leading-snug mt-2">Wrote, designed, and marketed it to a #1 debut.</p>
              </Reveal>
            </MagneticCard>

          </Reveal>
        </div>
      </section>

      <section className="relative block-red flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-5">
              <h2 className="heading-section text-white ali-custom-font">ENTERTAINMENT<br />EXCELLENCE</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/90">Lead in Oscar-nominated "The Breadwinner", 40+ film and TV credits including Netflix, Fox, CBS shows, and 5 televised comedy specials.</p>
            </div>
            <div className="flex justify-center">
              <ParallaxPhoto src="/images/ali-badshah-photo-03.png" alt="Ali Badshah" wrapperClassName="w-full max-w-md" className="rounded-3xl w-full" style={{aspectRatio: '4/5', objectFit: 'cover'}} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative block-red-dark flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="flex justify-center order-2 lg:order-1">
              <ParallaxPhoto src="/images/ali-badshah-photo-05.png" alt="Ali Badshah" wrapperClassName="w-full max-w-md" className="rounded-3xl w-full" style={{aspectRatio: '4/5', objectFit: 'cover'}} />
            </div>
            <div className="space-y-5 order-1 lg:order-2">
              <h2 className="heading-section text-white ali-custom-font">VENTURE<br />SUCCESS</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/90">Co-founder of award-winning ventures, with 15+ years of strategy, product development, and creative direction for major brands.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative block-red-deeper flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-5">
              <h2 className="heading-section text-white ali-custom-font">MYSTICAL<br />WISDOM</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/90">#1 bestselling poetry book "Ghost Flowers", Sufi practitioner since 2011, offering profound insights into personal transformation and authentic living.</p>
            </div>
            <div className="flex justify-center">
              <ParallaxPhoto src="/images/ali-badshah-photo-07.png" alt="Ali Badshah" wrapperClassName="w-full max-w-md" className="rounded-3xl w-full" style={{aspectRatio: '4/5', objectFit: 'cover'}} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative block-red flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <ParallaxPhoto src="/images/ali-badshah-photo-02.png" alt="Ali Badshah" wrapperClassName="w-full max-w-sm" className="w-full rounded-3xl shadow-2xl" style={{aspectRatio: '4/5', objectFit: 'cover'}} />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="heading-section text-white ali-custom-font">LET'S<br />CONNECT</h2>
              <p className="text-large text-white/90">Whether you're hiring, collaborating, or just want to talk about building things that matter.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-bold uppercase">&copy; 2026 Fulstakt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
