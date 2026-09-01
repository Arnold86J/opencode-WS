"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { verbs, allExpressions } from "@/lib/ebook-data";

export function SearchAndFilters({ onSelect }: { onSelect?: (id: string) => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return allExpressions.filter(e => e.title.toLowerCase().includes(s) || e.definition.toLowerCase().includes(s)).slice(0, 8);
  }, [q]);
  return (
    <div className="relative w-full max-w-[560px]">
      <div className="flex items-center gap-2 bg-white rounded-full border border-orange-200 shadow-sm px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#FF6B00]/20 focus-within:border-[#FF6B00]">
        <span className="text-neutral-400">⌕</span>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher une expression : être à la bourre, avoir le cafard..." className="flex-1 outline-none text-[14px] placeholder:text-neutral-400" />
        {q && <button onClick={()=>setQ("")} className="text-xs bg-neutral-100 px-2 py-1 rounded-full">effacer</button>}
      </div>
      {results.length>0 && (
        <div className="absolute mt-2 w-full bg-white rounded-2xl border shadow-xl overflow-hidden z-20">
          {results.map(r=> (
            <Link key={r.id} href={`/verbes/${verbs.find(v=> v.name===r.verb)?.slug}#${r.id}`} className="flex justify-between items-center px-4 py-3 hover:bg-orange-50 border-b last:border-0">
              <div>
                <div className="font-semibold text-sm text-[#FF6B00]">{r.title}</div>
                <div className="text-xs text-neutral-500 line-clamp-1">{r.definition}</div>
              </div>
              <span className="text-[11px] font-bold bg-orange-100 text-[#FF6B00] px-2 py-1 rounded-full">#{r.num}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
      <div className="h-full bg-[#FF6B00] transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
