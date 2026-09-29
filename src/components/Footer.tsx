import { site } from '../content/site';

export const Footer = () => {
  return (
    <footer className="border-t border-[#44576d] bg-[#dfebf6] text-[#29353c]">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <nav aria-label="Social links" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {site.socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}; 