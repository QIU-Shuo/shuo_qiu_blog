"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const QR_IMAGE_SRC = "/social/wechat-official-account.jpg";
const QR_IMAGE_ALT = "QR code for Shuo Qiu's WeChat official account";

function WeChatIcon({ className = "h-[0.95rem] w-[0.95rem]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9.154 4C5.203 4 2 6.805 2 10.266c0 1.93.996 3.655 2.56 4.796L3.72 18l3.01-1.653c.776.192 1.587.292 2.424.292 3.95 0 7.153-2.805 7.153-6.373C16.307 6.805 13.104 4 9.154 4Zm-2.61 4.384a.89.89 0 1 1 0 1.778.89.89 0 0 1 0-1.778Zm5.22 0a.89.89 0 1 1 0 1.778.89.89 0 0 1 0-1.778Zm6.154 2.282c-2.989 0-5.41 2.117-5.41 4.727 0 2.61 2.421 4.727 5.41 4.727.64 0 1.254-.097 1.824-.275L22 21l-.725-2.128c1.28-.895 2.053-2.201 2.053-3.479 0-2.61-2.421-4.727-5.41-4.727Zm-1.963 3.545a.71.71 0 1 1 0 1.42.71.71 0 0 1 0-1.42Zm3.924 0a.71.71 0 1 1 0 1.42.71.71 0 0 1 0-1.42Z" />
    </svg>
  );
}

export function WeChatQrTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[var(--color-text)]"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <WeChatIcon />
        <span>WeChat</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,17,21,0.38)] px-4 py-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-qr-title"
            className="relative w-full max-w-[360px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="rounded-[28px] border border-[var(--color-rule)] bg-[#fcfcfa] p-5 shadow-[0_28px_90px_rgba(15,17,21,0.24)]">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-rule)] bg-white text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                aria-label="Close WeChat QR code"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="pr-10">
                <div className="flex items-center gap-2 font-[family-name:var(--font-ibm-plex-sans)] text-[0.95rem] font-semibold text-[var(--color-text)]">
                  <WeChatIcon className="h-[1rem] w-[1rem]" />
                  <h2 id="wechat-qr-title">WeChat official account</h2>
                </div>
                <p className="mt-1 font-[family-name:var(--font-source-serif-4)] text-[0.95rem] leading-[1.55] text-[var(--color-muted)]">
                  Open WeChat, tap Scan, and scan this code to follow.
                </p>
              </div>

              <div className="mt-4 overflow-hidden rounded-[22px] border border-[var(--color-rule)] bg-white">
                <Image
                  src={QR_IMAGE_SRC}
                  alt={QR_IMAGE_ALT}
                  width={640}
                  height={640}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
