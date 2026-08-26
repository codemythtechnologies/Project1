export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--ivory)] border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-12">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-6">
            <div className="font-serif text-4xl md:text-5xl">
              Renaissance<span style={{ color: 'var(--emerald-accent)' }}>.</span>
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ivory)]/50">
              Management Consultants — Since 2001
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:text-right">
            <p className="font-serif italic text-lg text-[var(--ivory)]/70">
              Right Candidate for the Right Position.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ivory)]/50">
            &copy; {new Date().getFullYear()} Renaissance Management Consultants. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:renhrcentral@gmail.com"
              className="font-mono text-[10px] uppercase tracking-[0.22em] link-underline"
            >
              renhrcentral@gmail.com
            </a>
            <a href="tel:+919944909999" className="font-mono text-[10px] uppercase tracking-[0.22em] link-underline">
              +91 99449 09999
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
