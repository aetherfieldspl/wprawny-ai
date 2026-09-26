"use client";

import { useEffect, useState } from "react";

/**
 * Przycisk odsłuchu — syntezator mowy przeglądarki (Web Speech API, zh-CN).
 * Nic nie wysyłamy na serwer. Gdy przeglądarka nie wspiera syntezy, przycisk się nie pokazuje.
 */
export function Speak({ text, className = "" }: { text: string; className?: string }) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  if (!supported) return null;

  const say = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "zh-CN";
    utter.rate = 0.8;
    const voices = synth.getVoices();
    const voice =
      voices.find((v) => v.lang.replace("_", "-") === "zh-CN") ??
      voices.find((v) => v.lang.startsWith("zh"));
    if (voice) utter.voice = voice;
    synth.cancel();
    synth.speak(utter);
  };

  return (
    <button
      type="button"
      onClick={say}
      aria-label={`Odsłuchaj: ${text}`}
      title="Odsłuchaj"
      className={`inline-grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-card text-ink-soft transition-colors hover:border-brand hover:text-brand ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2.5 6h2.2L8 3.2v9.6L4.7 10H2.5z" fill="currentColor" />
        <path
          d="M10.6 5.4a3.6 3.6 0 0 1 0 5.2M12.3 3.7a6 6 0 0 1 0 8.6"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
