const taglines = [
  "Early Entry. Higher Exit.",
  "Winners Don't Wait.",
  "Turn 14 Days Into Profit.",
  "Move Early. Win Early.",
];

export function RotatingTagline({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-label={taglines[0]}
      className={`ft-tagline-rotator ${compact ? "is-compact" : ""}`}
    >
      {taglines.map((tagline) => (
        <span key={tagline} className="ft-tagline-rotator__line">
          {tagline}
        </span>
      ))}
    </span>
  );
}
