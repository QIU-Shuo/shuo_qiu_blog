"use client";

import { useEffect } from "react";

const COPY_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const CHECK_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export function CodeCopy() {
  useEffect(() => {
    function addCopyButtons() {
      document.querySelectorAll(".prose pre").forEach((pre) => {
        if (pre.querySelector("[data-copy-btn]")) return;
        const el = pre as HTMLElement;
        el.style.position = "relative";

        const btn = document.createElement("button");
        btn.setAttribute("data-copy-btn", "");
        btn.setAttribute("aria-label", "Copy code");
        btn.innerHTML = COPY_ICON;

        Object.assign(btn.style, {
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "6px",
          color: "#636e7b",
          cursor: "pointer",
          opacity: "0",
          transition: "opacity 150ms, background 150ms, color 150ms",
          zIndex: "3",
          backdropFilter: "blur(4px)",
        });

        el.addEventListener("mouseenter", () => {
          btn.style.opacity = "1";
        });
        el.addEventListener("mouseleave", () => {
          if (btn.dataset.copied !== "true") btn.style.opacity = "0";
        });

        btn.addEventListener("mouseenter", () => {
          btn.style.background = "rgba(255, 255, 255, 0.12)";
          btn.style.color = "#adbac7";
        });
        btn.addEventListener("mouseleave", () => {
          btn.style.background = "rgba(255, 255, 255, 0.06)";
          if (btn.dataset.copied !== "true") btn.style.color = "#636e7b";
        });

        btn.addEventListener("click", async () => {
          const code = pre.querySelector("code");
          if (!code) return;
          await navigator.clipboard.writeText(code.textContent || "");
          btn.dataset.copied = "true";
          btn.innerHTML = CHECK_ICON;
          btn.style.color = "#2ea043";
          btn.style.opacity = "1";
          setTimeout(() => {
            btn.dataset.copied = "false";
            btn.innerHTML = COPY_ICON;
            btn.style.color = "#636e7b";
            btn.style.opacity = "0";
          }, 2000);
        });

        pre.appendChild(btn);
      });
    }

    addCopyButtons();
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
