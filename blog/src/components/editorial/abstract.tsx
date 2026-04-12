interface AbstractProps {
  children: string;
}

export function Abstract({ children }: AbstractProps) {
  return (
    <div className="mx-auto max-w-[680px] mt-8 mb-6 px-6 md:px-0">
      <p className="border-l-[3px] border-[var(--color-accent)] pl-5 font-[family-name:var(--font-source-serif-4)] text-[1.0625rem] leading-[1.75] text-[var(--color-text-secondary)]">
        {children}
      </p>
    </div>
  );
}
