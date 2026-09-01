"use client";
export function AudioBtn({ label }: { label: string }) {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          const u = new SpeechSynthesisUtterance(label);
          u.lang = "fr-FR";
          u.rate = 0.9;
          speechSynthesis.cancel();
          speechSynthesis.speak(u);
        }
      }}
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-orange-50 text-[#FF6B00] px-2.5 py-1 rounded-full border border-orange-200 hover:bg-orange-100"
      title="Écouter (synthèse vocale démo) — remplace le MP3"
    >
      <span>🎧</span> ÉCOUTER
    </button>
  );
}

import { useState, useEffect } from "react";
export function FavButton({ id }: { id: string }) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    setFav(localStorage.getItem(`fav:${id}`) === "1");
  }, [id]);
  const toggle = () => {
    const v = !fav;
    setFav(v);
    if (v) localStorage.setItem(`fav:${id}`, "1");
    else localStorage.removeItem(`fav:${id}`);
    window.dispatchEvent(new Event("fav:update"));
  };
  return (
    <button
      onClick={toggle}
      className={`px-2 py-1 rounded-full border text-[11px] font-semibold ${fav ? "bg-amber-400 border-amber-400 text-white" : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}
    >
      {fav ? "★ Favori" : "☆ Favori"}
    </button>
  );
}
