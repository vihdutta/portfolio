import { Link } from 'react-router-dom';
import { site } from '../content/site';

export const Header = () => (
  <header className="sticky top-0 z-50 border-b border-[#44576d] bg-[#dfebf6]/95 backdrop-blur-sm">
    <div className="container mx-auto px-6 py-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link
          to="/"
          className="shrink-0 text-xl"
        >
          {site.name}
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {Object.entries(site.sections).map(([id, section]) => (
            <Link
              key={id}
              to={`/#${id}`}
              className="text-sm"
            >
              {id === 'projects' ? 'Projects' : section.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </header>
);
