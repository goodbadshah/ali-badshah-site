// TODO: Replace CONSULT_URL with the real top-of-funnel Calendly link.
const CONSULT_URL = 'https://calendly.com/your-handle/15-min-consult'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 px-6 bg-white shadow-lg flex items-center">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/images/ali-badshah-logo.png"
            alt="Ali Badshah Logo"
            className="h-12 w-12 object-contain"
          />
          <span
            className="text-3xl uppercase tracking-tight ali-custom-font whitespace-nowrap"
            style={{ color: "var(--red-hero)" }}
          >
            Ali Badshah
          </span>
        </a>

        <a
          href={CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-[var(--red-hero)] hover:bg-[var(--red-dark)] transition-colors"
        >
          Book a Consult
          <span aria-hidden="true">→</span>
        </a>

        <a
          href={CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a consult"
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-white bg-[var(--red-hero)] hover:bg-[var(--red-dark)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}
