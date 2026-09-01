"use client";
import { useMemo, useState, useEffect } from "react";
import { allExpressions, verbs } from "@/lib/ebook-data";
import Link from "next/link";

type Q = { q: string; options: string[]; answer: number; explain: string; href: string };

function buildQuiz(): Q[] {
  // 10 questions aléatoires basées sur les données réelles
  const shuffled = [...allExpressions].sort(()=> Math.random()-0.5).slice(0,10);
  return shuffled.map(ex=>{
    const wrong = allExpressions.filter(e=> e.verb!==ex.verb).sort(()=>Math.random()-0.5).slice(0,3).map(e=> e.title);
    const opts = [...wrong, ex.title].sort(()=>Math.random()-0.5);
    return {
      q: `Que signifie l'expression illustrée par : “${ex.example}” ?`,
      options: opts,
      answer: opts.indexOf(ex.title),
      explain: `${ex.title} — ${ex.definition}`,
      href: `/verbes/${verbs.find(v=>v.name===ex.verb)!.slug}#${ex.id}`
    };
  });
}

export default function QuizPage(){
  const [qs, setQs] = useState<Q[]|null>(null);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [favCount, setFavCount] = useState(0);

  useEffect(()=> setQs(buildQuiz()), []);
  useEffect(()=>{
    const upd=()=> setFavCount(Object.keys(localStorage).filter(k=>k.startsWith("fav:")).length);
    upd(); window.addEventListener("fav:update", upd); return ()=> window.removeEventListener("fav:update", upd);
  },[]);

  if(!qs) return <div className="max-w-[720px] mx-auto px-6 py-12">Chargement…</div>;
  const cur = qs[i];

  const answer = (idx:number)=>{
    if(chosen!==null) return;
    setChosen(idx);
    if(idx===cur.answer) setScore(s=>s+1);
  };
  const next = ()=>{
    if(i+1>=qs.length) setDone(true);
    else { setI(i+1); setChosen(null); }
  };

  if(done){
    const pct = Math.round(score/qs.length*100);
    return (
      <main className="max-w-[720px] mx-auto px-6 py-10">
        <div className="bg-white rounded-[24px] border p-8 text-center">
          <div className="text-5xl">{pct>=80?"🎉":pct>=50?"👏":"💪"}</div>
          <h1 className="mt-4 text-2xl font-black">Score : {score}/{qs.length} — {pct}%</h1>
          <p className="mt-2 text-sm text-neutral-600">{pct>=80?"Excellent ! Tu parles comme un Français." : pct>=50?"Pas mal ! Révise tes favoris et retente.":"Continue ! Relis les fiches et réécoute les audios."}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={()=>{setQs(buildQuiz()); setI(0); setScore(0); setDone(false); setChosen(null);}} className="px-6 py-3 rounded-full bg-[#FF6B00] text-white font-bold">Recommencer</button>
            <Link href="/" className="px-6 py-3 rounded-full border font-bold">Sommaire</Link>
          </div>
          <div className="mt-6 text-xs text-neutral-500">{favCount} expressions en favoris — révise-les régulièrement !</div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[720px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-neutral-600 hover:underline">← Sommaire</Link>
        <div className="text-xs font-mono bg-orange-50 text-[#FF6B00] px-3 py-1 rounded-full">Question {i+1} / {qs.length} • Score {score}</div>
      </div>
      <div className="mt-4 h-2 bg-orange-100 rounded-full overflow-hidden"><div className="h-full bg-[#FF6B00] transition-all" style={{width:`${(i/qs.length)*100}%`}} /></div>

      <div className="mt-6 bg-white rounded-[20px] border p-6 sm:p-8">
        <p className="text-[11px] tracking-widest font-bold text-[#FF6B00]">QUIZ — 100 EXPRESSIONS</p>
        <h2 className="mt-2 text-[18px] font-bold leading-snug">{cur.q}</h2>
        <div className="mt-6 space-y-3">
          {cur.options.map((op, idx)=>{
            const isChosen = chosen===idx;
            const isCorrect = idx===cur.answer;
            const show = chosen!==null;
            const cls = !show ? "bg-white border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50" : isCorrect ? "bg-emerald-50 border-emerald-300" : isChosen ? "bg-red-50 border-red-300" : "bg-white border-neutral-200 opacity-60";
            return (
              <button key={op} onClick={()=>answer(idx)} className={`w-full text-left px-4 py-3 rounded-xl border font-medium text-sm flex justify-between items-center ${cls}`}>
                <span>{op}</span>
                {show && isCorrect && <span>✓</span>}
                {show && isChosen && !isCorrect && <span>✗</span>}
              </button>
            );
          })}
        </div>
        {chosen!==null && (
          <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-100 text-sm">
            <div className="font-bold text-[#FF6B00]">{chosen===cur.answer?"Bonne réponse !":"Presque !"}</div>
            <div className="mt-1 text-neutral-700">{cur.explain}</div>
            <div className="mt-3 flex gap-2">
              <Link href={cur.href} className="text-xs bg-white border px-3 py-1.5 rounded-full">Voir la fiche →</Link>
              <button onClick={next} className="text-xs bg-[#FF6B00] text-white px-4 py-1.5 rounded-full font-bold">{i+1===qs.length?"Voir le score":"Suivante →"}</button>
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-neutral-500 text-center">Astuce : le quiz pioche dans les 100 expressions. Relance pour de nouvelles questions.</p>
    </main>
  );
}
