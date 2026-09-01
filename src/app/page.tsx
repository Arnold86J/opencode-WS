import Link from "next/link";
import { verbs } from "@/lib/ebook-data";
import { SearchAndFilters } from "@/components/EbookShell";

export default function Page() {
  return (
    <main>
      {/* HERO fidèle couverture PDF */}
      <section className="bg-white border-b">
        <div className="max-w-[1120px] mx-auto px-6 py-8 lg:py-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-[#FF6B00] uppercase">Anne Le Grand • Parlez-vous-French.com</div>
            <h1 className="mt-3 font-black leading-[0.9] tracking-tight">
              <span className="block text-[#FF6B00] text-[64px] sm:text-[92px]">100</span>
              <span className="block text-[#FF6B00] text-[28px] sm:text-[36px] leading-none">EXPRESSIONS<br/>INDISPENSABLES</span>
              <span className="block mt-3 bg-[#FF6B00] text-white px-4 py-3 text-[22px] sm:text-[28px] leading-none">POUR MIEUX<br/>PARLER<br/>FRANÇAIS</span>
            </h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#sommaire" className="px-6 py-3 rounded-full bg-[#FF6B00] text-white font-bold hover:bg-[#E55E00]">Commencer →</Link>
              <Link href="https://parlez-vous-french.com/100-expressions-audio" target="_blank" className="px-6 py-3 rounded-full bg-white border-2 border-[#FF6B00] text-[#FF6B00] font-bold">Télécharger MP3</Link>
            </div>
            <p className="mt-4 text-sm text-neutral-500">Version web interactive — 10 verbes × 10 expressions • Audio • Quiz • Favoris</p>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-50 rounded-[20px] p-6 border border-orange-100">
              <h3 className="font-extrabold text-[#FF6B00] text-lg">Avant de commencer</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">
                Vous avez certainement entendu un Français dire : « Je suis à la bourre » ou encore « J&apos;en ai marre ! ». C&apos;est normal, on utilise des expressions tous les jours en français. On ne peut pas les éviter, elles sont partout !
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">
                Cet eBook ne vous demande donc pas d&apos;apprendre par cœur une simple liste. Il est organisé autour des <b>dix verbes les plus utilisés</b>. À chaque verbe correspondent dix expressions expliquées et illustrées d&apos;un exemple simple.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">
                De plus, des <span className="text-[#FF6B00] underline font-semibold">fichiers audio téléchargeables</span> vous aideront à améliorer votre compréhension et prononciation.
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-5 border flex gap-4 items-center">
              <img src="https://i.pravatar.cc/200?img=32" alt="Anne" className="w-16 h-16 rounded-full object-cover border-2 border-orange-200" />
              <div>
                <div className="font-bold text-sm">À propos de l&apos;auteur</div>
                <div className="text-xs text-neutral-600 leading-relaxed">Anne enseigne le Français aux étrangers (FLE) depuis plus de 10 ans. Passionnée, elle a créé <span className="text-[#FF6B00] font-semibold">Parlez-vous-French.com</span> en 2016.</div>
              </div>
            </div>
            <div className="bg-[#0F172A] text-white rounded-[20px] p-5 flex justify-between items-center">
              <div>
                <div className="text-xs uppercase tracking-widest opacity-70">Programme intensif</div>
                <div className="font-bold">10% avec le coupon <span className="bg-white text-[#0F172A] px-2 py-1 rounded ml-1 font-mono">PARLEZVOUS10</span></div>
              </div>
              <Link href="https://parlez-vous-french.com/cours-de-francais-en-ligne/" target="_blank" className="text-xs underline opacity-80">En savoir plus</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recherche */}
      <section className="max-w-[1120px] mx-auto px-6 py-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <SearchAndFilters />
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 100 expressions • 10 verbes • audio sur chaque page
        </div>
      </section>

      {/* SOMMAIRE */}
      <section id="sommaire" className="max-w-[1120px] mx-auto px-6">
        <div className="bg-white rounded-[24px] border shadow-sm overflow-hidden">
          <div className="px-6 sm:px-8 py-6 border-b flex justify-between items-center">
            <h2 className="text-[32px] font-black text-[#FF6B00] tracking-tight">Sommaire</h2>
            <a href="https://parlez-vous-french.com/100-expressions-audio" target="_blank" className="text-xs text-[#FF6B00] hover:underline">Télécharger les MP3 →</a>
          </div>
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-orange-100">
            <div className="p-6 sm:p-8 space-y-0">
              {verbs.slice(0,5).map(v=> (
                <Link key={v.slug} href={`/verbes/${v.slug}`} className="flex items-center justify-between py-3 group border-b last:border-0 border-orange-50 hover:bg-orange-50/50 -mx-2 px-2 rounded-xl">
                  <div>
                    <div className="font-extrabold text-[#FF6B00] leading-none">{v.name}</div>
                    <div className="text-xs text-neutral-500">Conjugaison • 10 expressions</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-[11px] font-mono bg-orange-50 text-[#FF6B00] px-2 py-1 rounded-full">{v.expressions[0].num}–{v.expressions[9].num}</span>
                    <span className="w-8 h-8 grid place-items-center rounded-full border border-orange-200 group-hover:bg-[#FF6B00] group-hover:text-white transition">→</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-6 sm:p-8">
              {verbs.slice(5).map(v=> (
                <Link key={v.slug} href={`/verbes/${v.slug}`} className="flex items-center justify-between py-3 group border-b last:border-0 border-orange-50 hover:bg-orange-50/50 -mx-2 px-2 rounded-xl">
                  <div>
                    <div className="font-extrabold text-[#FF6B00] leading-none">{v.name}</div>
                    <div className="text-xs text-neutral-500">Conjugaison • 10 expressions</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-[11px] font-mono bg-orange-50 text-[#FF6B00] px-2 py-1 rounded-full">{v.expressions[0].num}–{v.expressions[9].num}</span>
                    <span className="w-8 h-8 grid place-items-center rounded-full border border-orange-200 group-hover:bg-[#FF6B00] group-hover:text-white transition">→</span>
                  </div>
                </Link>
              ))}
              <div className="mt-6 p-3 rounded-xl bg-[#FF6B00] text-white text-xs leading-relaxed">
                Astuce : cliquez sur un verbe pour voir sa page orange + conjugaison complète + 10 fiches expressions avec audio et exemple.
              </div>
            </div>
          </div>
          {/* Grille visuelle bento verbes */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-orange-50/50">
            {verbs.map(v=> (
              <Link key={v.slug} href={`/verbes/${v.slug}`} className="bg-[#FF6B00] text-white rounded-2xl p-4 flex flex-col justify-between min-h-[120px] hover:brightness-95 transition">
                <div className="text-[11px] tracking-widest opacity-80">{v.phonetic}</div>
                <div className="font-black text-xl leading-none">{v.name}</div>
                <div className="text-[11px] opacity-90">10 expressions →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comment progresser */}
      <section className="max-w-[1120px] mx-auto px-6 mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border p-6">
          <h3 className="font-extrabold text-[#FF6B00]">Comment progresser rapidement ?</h3>
          <p className="text-sm text-neutral-600 mt-2">3 niveaux : débutant, intermédiaire, avancé • Méthode simple • 100% en français pour immersion</p>
          <ul className="mt-3 text-sm list-disc pl-5 text-neutral-700">
            <li>N&apos;apprenez pas par cœur : écoutez, comprenez et adaptez au contexte.</li>
            <li>Écoutez chaque expression avec l&apos;audio (icône casque) et répétez à voix haute.</li>
            <li>Testez-vous avec le quiz — favoris pour réviser.</li>
          </ul>
        </div>
        <div className="bg-[#FF6B00] rounded-2xl p-6 text-white">
          <div className="text-sm font-bold">Objectif Factory</div>
          <div className="text-2xl font-black mt-1">Parler naturel</div>
          <div className="text-sm opacity-90 mt-2">Mieux comprendre les Français et mieux parler avec eux — au quotidien, au travail, entre amis.</div>
          <Link href="/quiz" className="mt-4 inline-block bg-white text-[#FF6B00] px-4 py-2 rounded-full font-bold text-sm">Lancer le quiz</Link>
        </div>
      </section>
    </main>
  );
}
