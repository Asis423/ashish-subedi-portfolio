export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border-subtle bg-bg px-12 py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo mark */}
        <div className="flex items-center gap-3">
          <span className="font-ui font-extrabold text-lg text-gold">AS</span>
          <span className="w-px h-4 bg-border-gold" />
          <span className="font-ui text-[11px] font-medium tracking-[0.12em] uppercase text-ink-faint">
            Ashish Subedi
          </span>
        </div>

        {/* Domain */}
        <a
          href="https://ashish-subedi.com.np"
          className="font-ui text-[11px] tracking-wide text-ink-faint hover:text-gold transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          ashish-subedi.com.np
        </a>

        {/* Copyright */}
        <p className="font-ui text-[10px] tracking-wide text-ink-faint">
          © {year} Ashish Subedi · Senior Graphic Designer
        </p>
      </div>
    </footer>
  )
}