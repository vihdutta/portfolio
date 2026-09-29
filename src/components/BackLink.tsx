import { Link } from 'react-router-dom';

export const BackLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#aac7d8]/60 bg-white/40 px-3 py-2 text-sm font-medium leading-none text-[#44576d] no-underline hover:bg-white/70 hover:text-[#29353c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44576d]"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="m12 19-7-7 7-7M5 12h14" />
    </svg>
    <span>{children}</span>
  </Link>
);
