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
      </div>
    </header>
  );
}
