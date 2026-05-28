

export default function HalalYouNeedCaseStudy() {
  return (
    <main className="min-h-screen bg-white">

      <div className="pt-20" style={{ background: "linear-gradient(135deg, #0d0303 0%, #300f4a 60%, #6d35bb 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-16 md:pt-20 md:pb-24">
          <a href="/#case-studies" className="inline-flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors mb-10">
            ← Back to Work
          </a>

          <div className="mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-white/60 bg-white/10 px-3 py-2 rounded-full">
              Mobile App · Product Design
            </span>
          </div>

          <div className="mb-4">
            <img src="/images/halalYouNeed-logo.png" alt="HalalYouNeed" className="h-16 md:h-24 lg:h-28 w-auto" />
          </div>

          <p className="text-xl md:text-2xl text-white/60 font-medium mb-10 max-w-2xl">
            Gamified Islamic Prayer App
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wide text-white/50 border border-white/20 px-3 py-2 rounded-full">Product Design</span>
            <span className="text-xs font-bold uppercase tracking-wide text-white/50 border border-white/20 px-3 py-2 rounded-full">React Native</span>
            <span className="text-xs font-bold uppercase tracking-wide text-white/50 border border-white/20 px-3 py-2 rounded-full">Claude Code</span>
            <span className="text-xs font-bold uppercase tracking-wide text-white/50 border border-white/20 px-3 py-2 rounded-full">Figma MCP</span>
            <span className="text-xs font-bold uppercase tracking-wide text-white/50 border border-white/20 px-3 py-2 rounded-full">Supabase</span>
            <span className="text-xs font-bold uppercase tracking-wide text-white/50 border border-white/20 px-3 py-2 rounded-full">RevenueCat</span>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-sm">
            <div className="bg-white/10 rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-black text-white">60%</div>
              <div className="text-xs font-bold uppercase tracking-wide text-white/50 mt-1">Free-to-Paid</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-black text-white">&lt;90</div>
              <div className="text-xs font-bold uppercase tracking-wide text-white/50 mt-1">Days to Ship</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-black text-white">Solo</div>
              <div className="text-xs font-bold uppercase tracking-wide text-white/50 mt-1">Build</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full aspect-video rounded-2xl bg-neutral-100 border border-neutral-200"></div>
        </div>
      </div>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-red text-xs font-bold uppercase tracking-widest mb-6">Overview</p>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed text-neutral-800">
            HalalYouNeed is a gamified Islamic prayer and habits app for Muslim families. Built solo, zero to App Store in under 90 days, it hit 60% free-to-paid conversion on launch day.
          </p>
          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed mt-6">
            Most prayer apps are digital paper trackers that run on willpower alone. HalalYouNeed applies the same behavioural psychology behind games and social apps to make prayer automatic and engaging for whole families, adults and kids together.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-red text-xs font-bold uppercase tracking-widest mb-4">Process</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-16 md:mb-24 ali-custom-font">
            Design Thinking
          </h2>

          <div className="space-y-24 md:space-y-32">

            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block-red text-xs font-black px-3 py-2 rounded-full text-white uppercase tracking-widest">1</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Empathize</span>
              </div>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-5">The Fajr Problem</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">I spent 12 years setting alarms for Fajr and snoozing every one of them. When I started talking to other Muslims, parents and young adults and families across North America, I kept hearing the same story back. 76% of Western Muslims skip Fajr regularly. 58% don't complete all five daily prayers. The average Muslim has been wrestling with this for over a decade. What hit hardest wasn't the personal guilt. It was the family piece. Parents watching their kids normalise missing prayers. Kids with Islamic apps sitting untouched on their devices. This wasn't an individual problem. It was a generational one.</p>
                </div>
                <div>
                  <div className="w-full aspect-video rounded-2xl bg-neutral-100 border border-neutral-200"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block-red text-xs font-black px-3 py-2 rounded-full text-white uppercase tracking-widest">2</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Define</span>
              </div>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="md:order-2">
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-5">Habit Design, Not Willpower</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">The first assumption on the table was that people need better reminders. It fell apart fast. Everyone I talked to already had five alarms set. They all got snoozed. The real insight was simpler and harder: existing Islamic apps were digital paper trackers running entirely on willpower, and willpower isn't a system. This isn't a discipline problem. It's a habit design problem. The brief became clear: build something that makes prayer engaging and automatic for whole families, using the same behavioural psychology that makes games impossible to put down.</p>
                </div>
                <div className="md:order-1">
                  <div className="w-full aspect-video rounded-2xl bg-neutral-100 border border-neutral-200"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block-red text-xs font-black px-3 py-2 rounded-full text-white uppercase tracking-widest">3</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Ideate</span>
              </div>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-5">Game Psychology Meets Prayer</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">The starting hypothesis: take the techniques that make people check Instagram 50 times a day and apply them to prayer. I worked through streaks, 35+ achievement tiers, family leaderboards, and positive reinforcement loops. Smart Fajr Rising took shape as a concept here. Rather than a passive alarm that invites snoozing, it's a wake-up with physical activation, shake to dismiss, designed to break the snooze habit at the exact moment it actually happens. The family leaderboard changed the project's direction. Early testing pointed to something counterintuitive: kids would compete hard enough that they'd end up pushing their parents to pray, not the other way around.</p>
                </div>
                <div>
                  <div className="w-full aspect-video rounded-2xl bg-neutral-100 border border-neutral-200"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block-red text-xs font-black px-3 py-2 rounded-full text-white uppercase tracking-widest">4</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Prototype</span>
              </div>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="md:order-2">
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-5">From Figma to Native</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">Built the design system in Figma first, component library, colour tokens, type scale, then moved straight to functional React Native prototypes using an AI-native workflow with Claude Code. This cut the design-to-dev handoff down to almost nothing. Within two weeks there was a working prototype on device running the full core loop: Smart Fajr Rising alarm, prayer logging, streak tracking, family setup, and the achievements layer, ready for real morning testing.</p>
                </div>
                <div className="md:order-1">
                  <div className="w-full aspect-video rounded-2xl bg-neutral-100 border border-neutral-200"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block-red text-xs font-black px-3 py-2 rounded-full text-white uppercase tracking-widest">5</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Test</span>
              </div>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-5">What Beta Testing Showed</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">The clearest finding from beta was around the family feature. One tester's 8-year-old started asking to pray together to keep their family streak alive. The kid was motivating the parent. That confirmed the core bet. The Smart Fajr alarm consistently outperformed passive alarms in real wake-up tests. A few things needed fixing across iterations: family onboarding had to feel like a celebration, not a setup process. Achievement notifications needed to fire right after prayer, not hours later. And the analytics screen needed to read like a highlight, not a report card.</p>
                </div>
                <div>
                  <div className="w-full aspect-video rounded-2xl bg-neutral-100 border border-neutral-200"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block-red text-xs font-black px-3 py-2 rounded-full text-white uppercase tracking-widest">6</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Implement</span>
              </div>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="md:order-2">
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-5">Solo-Shipped in 90 Days</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">Claude Code for React Native, Figma for the design system. Zero to App Store in under 90 days, solo. Working AI-native meant design intent and implementation lived in the same place, so nothing got lost moving between the two. App Store submission, TestFlight beta, analytics integration, RevenueCat paywall. Launch day conversion: 60% free-to-paid.</p>
                </div>
                <div className="md:order-1">
                  <div className="w-full aspect-video rounded-2xl bg-neutral-100 border border-neutral-200"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="block-red px-6 py-16 md:py-24 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-12 ali-custom-font">Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/15 rounded-2xl p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-black">60%</div>
              <div className="text-xs font-bold uppercase tracking-wide text-white/70 mt-2">Free-to-Paid Conversion</div>
            </div>
            <div className="bg-white/15 rounded-2xl p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-black">&lt;90d</div>
              <div className="text-xs font-bold uppercase tracking-wide text-white/70 mt-2">Concept to App Store</div>
            </div>
            <div className="bg-white/15 rounded-2xl p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-black">5★</div>
              <div className="text-xs font-bold uppercase tracking-wide text-white/70 mt-2">App Store Rating</div>
            </div>
            <div className="bg-white/15 rounded-2xl p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-black">1</div>
              <div className="text-xs font-bold uppercase tracking-wide text-white/70 mt-2">Solo Builder</div>
            </div>
          </div>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
            60% free-to-paid on launch day. That number came from one thing: the app actually works. When people wake up for Fajr more consistently in the first week, paying for it is an easy call. Building it solo with an AI-native workflow also showed that one person can ship production-quality consumer software without a team or a long runway.
          </p>
        </div>
      </section>

      <section className="bg-black text-white px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 ali-custom-font">Want to Build Something?</h2>
          <p className="text-lg text-white/50 mb-10">I design, build, and ship products end-to-end. Let's talk.</p>
          <a href="/#case-studies" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-wide rounded-full hover:bg-white/10 transition-colors">
            ← All Work
          </a>
        </div>
      </section>

      <footer className="py-10 px-6 bg-neutral-950 text-neutral-600">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-wide">
            &copy; 2026 Fulstakt. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}
