interface KeyFindingsProps {
  findings: string[];
}

export function KeyFindings({ findings }: KeyFindingsProps) {
  return (
    <div className="bg-[var(--color-bg-subtle)] border-y border-[var(--color-rule)]">
      <div className="mx-auto max-w-[680px] py-6 px-6 md:px-0">
        <h2 className="mt-0 mb-3 section-label">
          Key Findings
        </h2>
        <ul className="m-0 list-none p-0 space-y-2.5">
          {findings.map((finding, i) => (
            <li
              key={i}
              className="flex gap-3 font-[family-name:var(--font-source-serif-4)] text-[0.9375rem] leading-[1.6] text-[var(--color-text-secondary)]"
            >
              <span className="mt-[1px] shrink-0 font-[family-name:var(--font-ibm-plex-mono)] text-[0.6875rem] font-medium text-[var(--color-accent)] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
