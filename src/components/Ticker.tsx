"use client";
import { useEffect, useRef } from "react";

const brandLogos = [
  { src: '/images/netflix-logo.png', alt: 'Netflix', size: 'h-5' },
  { src: '/images/prime-video-logo.png', alt: 'Prime Video', size: 'h-8' },
  { src: '/images/disney-logo.png', alt: 'Disney+', size: 'h-8' },
  { src: '/images/wb-logo.png', alt: 'Warner Bros', size: 'h-8' },
  { src: '/images/cbs-logo.png', alt: 'CBS', size: 'h-5' },
  { src: '/images/entrepreneur-logo.png', alt: 'Entrepreneur', size: 'h-8' },
  { src: '/images/nbc-logo.png', alt: 'NBC', size: 'h-8' },
  { src: '/images/cbc-logo.png', alt: 'CBC', size: 'h-5' },
  { src: '/images/crave-logo.png', alt: 'Crave', size: 'h-4' },
  { src: '/images/adult-swim-logo.png', alt: 'Adult Swim', size: 'h-5' },
];

export default function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    let pos = 0;
    let rafId: number;
    const animate = () => {
      pos -= 0.5;
      const halfWidth = ticker.scrollWidth / 2;
      if (Math.abs(pos) >= halfWidth) pos = 0;
      ticker.style.transform = `translateX(${pos}px)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    const ro = new ResizeObserver(() => { pos = 0; });
    ro.observe(ticker);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-black h-16 overflow-hidden flex items-center">
      <div ref={tickerRef} className="ticker flex flex-nowrap items-center gap-16" style={{ willChange: 'transform' }}>
        {[...brandLogos, ...brandLogos].map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.alt} className={`${logo.size} brightness-0 invert flex-shrink-0 block ticker-logo`} />
        ))}
      </div>
    </div>
  );
}
