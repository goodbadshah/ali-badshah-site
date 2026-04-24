"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [viewCount, setViewCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    let views = 0;
    let followers = 0;
    const interval = setInterval(() => {
      views = Math.min(views + 2, 100);
      followers = Math.min(followers + 500, 25000);
      setViewCount(views);
      setFollowerCount(followers);
      if (views >= 100 && followers >= 25000) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative block-red px-6 pt-52 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="heading-section text-white ali-custom-font">
                  Build a product, write a novel, lose 30 pounds, fall in love, and save the world in 90 days!*<span className="text-xs text-white/60 ml-1">*results may vary</span>
                </h2>
                <p className="text-large text-white/80">
                  AI-native product designer, enterprise strategist, #1 bestselling author, Oscar-nominated storyteller, and honest-to-goodness mystic. <strong>I help you design, build, and ship your dreams!</strong>
                </p>
                {/* Place the AI chat here */}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 lg:p-6 text-center">
                  <div className="text-lg lg:text-3xl font-black text-gray-900">{viewCount}M+</div>
                  <div className="text-xs font-bold text-gray-500 uppercase">Views</div>
                </div>
                <div className="bg-white rounded-2xl p-4 lg:p-6 text-center">
                  <div className="text-lg lg:text-3xl font-black text-gray-900">{followerCount.toLocaleString()}+</div>
                  <div className="text-xs font-bold text-gray-500 uppercase">Followers</div>
                </div>
                <div className="bg-white rounded-2xl p-4 lg:p-6 text-center">
                  <div className="text-lg lg:text-3xl font-black text-gray-900">#1</div>
                  <div className="text-xs font-bold text-gray-500 uppercase">Bestselling Author</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/ali-badshah-photo-06.png"
                alt="Ali Badshah"
                className="w-full max-w-lg mx-auto rounded-3xl float-element"
                style={{aspectRatio: '4/5', objectFit: 'cover'}}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="relative bg-white px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h2 className="heading-section text-gray-900 mb-4 ali-custom-font">WHAT I BUILD</h2>
            <p className="text-large text-gray-500 max-w-2xl">
              End-to-end product design, development, and go-to-market. From research to shipped.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

            <a href="/work/halalyouneed" className="group relative aspect-square overflow-hidden rounded-2xl block">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: "linear-gradient(135deg, #0d0303 0%, #4a0f0f 60%, #bb3535 100%)" }} />
              <img src="/images/work-halalyouneed.png" alt="HalalYouNeed" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(0, 0, 0, 0.85)" }} />
              <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">HalalYouNeed</h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wide mt-2">Gamified Islamic Prayer App</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-3">Solo-shipped from concept to App Store. AI-native workflow. 60% free-to-paid conversion at launch.</p>
                  <div className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wide mt-5 transition-transform duration-200">
                    View Case Study <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                  </div>
                </div>
              </div>
            </a>

            <a href="/work/lumiii" className="group relative aspect-square overflow-hidden rounded-2xl block">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: "linear-gradient(135deg, #0d0520 0%, #2d1b69 60%, #5b21b6 100%)" }} />
              <img src="/images/work-lumiii.png" alt="Lumiii" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(0, 0, 0, 0.85)" }} />
              <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">Lumiii</h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wide mt-2">Anime Brand & Gamified UNSDG Platform</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-3">Won 2022 World EdTech Startup Challenge. Evidence-based research via UCL. Raised $800K.</p>
                  <div className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wide mt-5 transition-transform duration-200">
                    View Case Study <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                  </div>
                </div>
              </div>
            </a>

            <a href="/work/ghost-flowers" className="group relative aspect-square overflow-hidden rounded-2xl block">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: "linear-gradient(135deg, #0f0e0d 0%, #292524 60%, #57534e 100%)" }} />
              <img src="/images/work-ghostflowers.png" alt="Ghost Flowers" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(0, 0, 0, 0.85)" }} />
              <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">Ghost Flowers</h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wide mt-2">#1 Bestselling Book</p>
                  <p className="text-white/70 text-sm leading-relaxed mt-3">Wrote, designed, built the website, optimised the Amazon listing, and ran the email campaign to a #1 debut.</p>
                  <div className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wide mt-5 transition-transform duration-200">
                    View Case Study <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                  </div>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>

      <section className="relative block-red flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-3">
              <h2 className="heading-section text-white ali-custom-font">ENTERTAINMENT<br />EXCELLENCE</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/90">Lead in Oscar-nominated "The Breadwinner", 50+ film and TV credits including Netflix, Fox, CBS shows, and 5 televised comedy specials.</p>
            </div>
            <div className="flex justify-center">
              <img src="/images/ali-badshah-photo-03.png" alt="Ali Badshah" className="rounded-3xl w-full max-w-md float-element" style={{aspectRatio: '4/5', objectFit: 'cover'}} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative block-red-dark flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="flex justify-center order-2 lg:order-1">
              <img src="/images/ali-badshah-photo-05.png" alt="Ali Badshah" className="rounded-3xl w-full max-w-md float-element" style={{aspectRatio: '4/5', objectFit: 'cover', animationDelay: '1s'}} />
            </div>
            <div className="space-y-3 order-1 lg:order-2">
              <h2 className="heading-section text-white ali-custom-font">ENTREPRENEURIAL<br />SUCCESS</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/90">Co-founder of award-winning ventures, with 15+ years of strategy, product development, and creative direction for major brands.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative block-red-deeper flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-3">
              <h2 className="heading-section text-white ali-custom-font">MYSTICAL<br />WISDOM</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/90">#1 bestselling poetry book "Ghost Flowers", Sufi practitioner since 2011, offering profound insights into personal transformation and authentic living.</p>
            </div>
            <div className="flex justify-center">
              <img src="/images/ali-badshah-photo-07.png" alt="Ali Badshah" className="rounded-3xl w-full max-w-md float-element" style={{aspectRatio: '4/5', objectFit: 'cover'}} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative block-red flex items-center justify-center px-6 py-8 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="heading-section text-white ali-custom-font">LET'S<br />CONNECT</h2>
              <p className="text-large text-white/90">Whether you're hiring, collaborating, or just want to talk about building things that matter.</p>
            </div>
            <div className="space-y-6">
              <button className="btn-red-light w-full">GET IN TOUCH</button>
              <div className="flex justify-center">
                <img src="/images/ali-badshah-photo-02.png" alt="Ali Badshah" className="w-full max-w-sm rounded-3xl float-element shadow-2xl" style={{aspectRatio: '4/5', objectFit: 'cover'}} />
              </div>
            </div>
          </div>
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
