import type React from "react";

type Verdict = "PASS" | "FAIL";

interface TrajectoryCaseProps {
  id: string;
  agent: string;
  closingToken: string;
  groundTruth: Verdict;
  agentevalVerdict: Verdict;
  descOnlyVerdict: Verdict;
  skillVerdict: Verdict;
  caseId?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function TrajectoryCase({
  id,
  agent,
  closingToken,
  groundTruth,
  agentevalVerdict,
  descOnlyVerdict,
  skillVerdict,
  caseId,
  defaultOpen = false,
  children,
}: TrajectoryCaseProps) {
  const verdicts = [
    { label: "agenteval", verdict: agentevalVerdict },
    { label: "desc-only", verdict: descOnlyVerdict },
    { label: "skill+trace", verdict: skillVerdict },
  ];
  return (
    <details
      open={defaultOpen}
      className="trajectory-case not-prose group my-8 overflow-hidden rounded-lg border border-[var(--color-rule)] bg-white"
    >
      <summary className="trajectory-case-summary cursor-pointer list-none px-5 py-4 transition-colors hover:bg-[var(--color-bg-subtle)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-ibm-plex-sans)] text-[0.95rem] font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                {id}
              </span>
              <span
                aria-hidden="true"
                className="trajectory-case-chevron text-[0.7rem] text-[var(--color-muted)] transition-transform"
              >
                ▸
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-ibm-plex-mono)] text-[0.7rem] text-[var(--color-muted)]">
              <span className="rounded bg-[var(--color-bg-subtle)] px-1.5 py-0.5 text-[var(--color-text-secondary)]">
                {agent}
              </span>
              <span>·</span>
              <span className="rounded bg-[var(--color-bg-subtle)] px-1.5 py-0.5 text-[var(--color-text-secondary)]">
                {closingToken}
              </span>
            </div>
          </div>
          <GroundTruthPill value={groundTruth} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {verdicts.map((v) => (
            <VerdictCell
              key={v.label}
              label={v.label}
              verdict={v.verdict}
              truth={groundTruth}
            />
          ))}
        </div>

        {caseId && (
          <div className="mt-3 truncate font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] text-[var(--color-muted)]">
            <span className="text-[var(--color-rule-strong)]">case_id</span>{" "}
            {caseId}
          </div>
        )}
      </summary>
      <div className="border-t border-[var(--color-rule)] bg-[var(--color-bg-subtle)] px-5 py-5">
        <div className="prose-sm">{children}</div>
      </div>
    </details>
  );
}

function GroundTruthPill({ value }: { value: Verdict }) {
  const isFail = value === "FAIL";
  return (
    <div className="flex shrink-0 flex-col items-end">
      <span className="font-[family-name:var(--font-ibm-plex-sans)] text-[0.625rem] uppercase tracking-[0.12em] text-[var(--color-muted)]">
        Ground truth
      </span>
      <span
        className={`mt-0.5 rounded-md border px-2.5 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[0.8rem] font-semibold ${
          isFail
            ? "border-rose-200 bg-rose-50 text-rose-700"
            : "border-emerald-200 bg-emerald-50 text-emerald-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function VerdictCell({
  label,
  verdict,
  truth,
}: {
  label: string;
  verdict: Verdict;
  truth: Verdict;
}) {
  const matches = verdict === truth;
  const classes = matches
    ? "border-emerald-200 bg-emerald-50/70"
    : "border-rose-200 bg-rose-50/70";
  const verdictColor = matches ? "text-emerald-800" : "text-rose-800";
  const iconColor = matches ? "text-emerald-600" : "text-rose-600";
  return (
    <div
      className={`flex flex-col rounded-md border px-2.5 py-2 ${classes}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-ibm-plex-sans)] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
          {label}
        </span>
        <span
          aria-label={matches ? "matches ground truth" : "disagrees with ground truth"}
          className={`font-[family-name:var(--font-ibm-plex-mono)] text-[0.85rem] leading-none ${iconColor}`}
        >
          {matches ? "✓" : "✗"}
        </span>
      </div>
      <span
        className={`mt-1 font-[family-name:var(--font-ibm-plex-mono)] text-[0.95rem] font-semibold ${verdictColor}`}
      >
        {verdict}
      </span>
    </div>
  );
}
