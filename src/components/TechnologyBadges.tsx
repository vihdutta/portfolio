interface TechnologyBadgesProps {
  technologies: string[];
  centered?: boolean;
}

export const TechnologyBadges = ({ technologies, centered = false }: TechnologyBadgesProps) => {
  if (technologies.length === 0) return null;

  return (
    <ul
      aria-label="Technologies used"
      className={`mt-4 flex flex-wrap gap-2${centered ? ' justify-center' : ''}`}
    >
      {technologies.map((technology) => (
        <li
          key={technology}
          className="rounded-full border border-[#aac7d8]/25 bg-[#eaf1f6] px-3 py-1 text-xs font-medium text-[#44576d]"
        >
          {technology}
        </li>
      ))}
    </ul>
  );
};
