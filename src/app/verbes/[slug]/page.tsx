import { verbs, verbBySlug } from "@/lib/ebook-data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioBtn, FavButton } from "@/components/AudioButton";

export function generateStaticParams() {
  return verbs.map(v=> ({ slug: v.slug }));
}

export default function VerbPage({ params }: { params: { slug: string }}) {
  const verb = verbBySlug(params.slug);
  if(!verb) return notFound();
  const idx = verbs.findIndex(v=> v.slug===verb.slug);
  const prev = verbs[idx-1];
  const next = verbs[idx+1];
  return (
    <main>
      {/* COVER ORANGE — fidèle PDF */}
      <section className="bg-[#FF6B00] text-white">
        <div className="max-w-[1120px] mx-auto px-6 py-10 sm:py-14">
          <div className="flex items-center gap-2 text-[12px] tracking-widest opacity-80"><Link href="/" className="hover:underline">Sommaire</Link><span>›</span><span>{verb.name}</span></div>
          <div className="mt-4 flex flex-wrap items-baseline gap-4">
            <h1 className="font-black text-[56px] sm:text-[84px] leading-[0.9] tracking-tight">{verb.name}</h1>
            <span className="text-2xl font-light opacity-80 tracking-wide">{verb.phonetic}</span>
          </div>
          <p className="mt-4 max-w-[640px] text-sm leading-relaxed opacity-90">{verb.definition}</p>
          <p className="text-[11px] opacity-60 mt-2">Source : Larousse.fr</p>
          <div className="mt-6 space-y-1 text-sm font-medium opacity-90">
            {verb.coverExample.map((ex,i)=> <div key={i} className="italic">« {ex.replaceAll('«','').replaceAll('»','')} »</div>)}
          </div>
        </div>
      </section>

      {/* Conjugaison */}
      <section className="max-w-[1120px] mx-auto px-6 -mt-6">
        <div className="bg-white rounded-[20px] border shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-[#FF6B00] text-2xl">{verb.name}</h2>
            <AudioBtn label={`${verb.name} ${verb.phonetic} ${verb.conjugation.present.join(', ')}`} />
          </div>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-6 text-[13px] leading-6">
            <div>
              <div className="font-bold text-[#FF6B00] mb-2">Présent</div>
              {verb.conjugation.present.map(t=> <div key={t}><span className="text-neutral-400 mr-1">{t.split(' ')[0]}</span><span className="font-semibold text-[#FF6B00]">{t.split(' ').slice(1).join(' ')||t}</span></div>)}
              <div className="font-bold text-[#FF6B00] mt-4 mb-2">Futur simple</div>
              {verb.conjugation.futur.map(t=> <div key={t} className="text-neutral-700">{t}</div>)}
              <div className="font-bold text-[#FF6B00] mt-4 mb-2">Impératif</div>
              {verb.conjugation.imperatif.map(t=> <div key={t} className="text-neutral-700">{t}</div>)}
            </div>
            <div>
              <div className="font-bold text-[#FF6B00] mb-2">Passé composé</div>
              {verb.conjugation.passeCompose.map(t=> <div key={t} className="text-neutral-700">{t}</div>)}
              <div className="font-bold text-[#FF6B00] mt-4 mb-2">Conditionnel <span className="text-[11px] font-normal">(présent)</span></div>
              {verb.conjugation.conditionnel.map(t=> <div key={t} className="text-neutral-700">{t}</div>)}
            </div>
            <div>
              <div className="font-bold text-[#FF6B00] mb-2">Imparfait</div>
              {verb.conjugation.imparfait.map(t=> <div key={t} className="text-neutral-700">{t}</div>)}
              <div className="font-bold text-[#FF6B00] mt-4 mb-2">Subjonctif <span className="text-[11px] font-normal">(présent)</span></div>
              {verb.conjugation.subjonctif.map(t=> <div key={t}><span className="text-neutral-400 mr-1">{t.split(' ').slice(0,2).join(' ')}</span><span className="font-semibold text-[#FF6B00]">{t.split(' ').slice(2).join(' ')}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Expressions */}
      <section className="max-w-[1120px] mx-auto px-6 mt-8 space-y-6">
        {verb.expressions.map(ex=> (
          <article key={ex.id} id={ex.id} className="bg-white rounded-[20px] border p-6 sm:p-7 scroll-mt-[80px]">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-extrabold text-[#FF6B00] text-[18px]"><span className="opacity-60">#{ex.num}.</span> {ex.title}</h3>
              <AudioBtn label={`${ex.title}. ${ex.definition} Exemple : ${ex.example}`} />
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">{ex.definition} {ex.synonym && <span className="text-neutral-500">Synonyme : <b>{ex.synonym}</b>.</span>}</p>
            <div className="mt-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-[13px] leading-relaxed text-neutral-800">
              <span className="font-bold text-[#FF6B00]">&gt;&gt; </span>
              <span dangerouslySetInnerHTML={{__html: ex.example.replace(ex.exampleHighlight, `<span class="font-bold text-[#FF6B00]">${ex.exampleHighlight}</span>`)}} />
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px]">
              {ex.register && <span className="px-2 py-1 rounded-full bg-neutral-100 border text-neutral-600">{ex.register}</span>}
              <span className="px-2 py-1 rounded-full bg-[#FF6B00] text-white font-semibold">{verb.name}</span>
              <FavButton id={ex.id} />
            </div>
          </article>
        ))}
      </section>

      {/* Nav */}
      <nav className="max-w-[1120px] mx-auto px-6 mt-10 flex justify-between gap-4">
        {prev ? <Link href={`/verbes/${prev.slug}`} className="flex-1 bg-white border rounded-2xl p-4 hover:bg-orange-50">← {prev.name} <span className="block text-xs text-neutral-500">Précédent</span></Link> : <div />}
        {next ? <Link href={`/verbes/${next.slug}`} className="flex-1 bg-[#FF6B00] text-white rounded-2xl p-4 text-right hover:brightness-95">{next.name} →<span className="block text-xs opacity-80">Suivant</span></Link> : <Link href="/quiz" className="flex-1 bg-[#0F172A] text-white rounded-2xl p-4 text-right">Quiz →<span className="block text-xs opacity-80">Testez-vous</span></Link>}
      </nav>

      <div className="text-center mt-8 text-xs text-neutral-400">© Parlez-vous-French.com 2020 • Page {idx+2} — {verb.name}</div>
    </main>
  );
}
