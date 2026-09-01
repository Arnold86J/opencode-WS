import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "100 Expressions Indispensables — Pour mieux parler français | Parlez-vous French",
  description: "La version web interactive de l'eBook d'Anne Le Grand. 10 verbes, 100 expressions expliquées avec audio, exemples et quiz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-orange-100">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00] grid place-items-center text-white font-black text-[14px] tracking-tight">Ɛ</div>
              <span className="hidden sm:inline font-bold text-[13px] tracking-wide text-neutral-800">Parlez-vous-French.com</span>
            </Link>
            <nav className="flex items-center gap-1 text-[13px] font-medium">
              <Link href="/#sommaire" className="px-3 py-1.5 rounded-full hover:bg-orange-50 text-neutral-700">Sommaire</Link>
              <Link href="/quiz" className="px-3 py-1.5 rounded-full hover:bg-orange-50 text-neutral-700">Quiz</Link>
              <Link href="https://parlez-vous-french.com/100-expressions-audio" target="_blank" className="ml-2 px-4 py-2 rounded-full bg-[#FF6B00] text-white font-semibold hover:bg-[#E55E00] transition">Audio MP3</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-16 border-t bg-white">
          <div className="max-w-[1120px] mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-neutral-500">
            <div>
              <p className="font-semibold text-neutral-800">© Parlez-vous-French.com 2020 — Anne Le Grand</p>
              <p className="mt-1">eBook offert gratuitement. Ne peut être vendu sans accord préalable.</p>
              <p className="mt-1"><a href="mailto:anne@parlez-vous-french.com" className="text-[#FF6B00] hover:underline">anne@parlez-vous-french.com</a> • Enseignante FLE depuis 10 ans</p>
            </div>
            <div className="text-right sm:text-left">
              <p>Version web interactive — Projet Factory <span className="font-mono text-xs bg-orange-50 px-1.5 py-0.5 rounded">project-002</span></p>
              <p className="mt-1"><Link href="/" className="text-[#FF6B00] hover:underline">Accueil</Link> • <Link href="/#sommaire" className="text-[#FF6B00] hover:underline">Sommaire</Link></p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
