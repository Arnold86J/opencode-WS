// TASK-045 COMPLETED — Frontend DAG join
// Refero Linear DESIGN.md + Aceternity bento-grid + Mobbin dashboard patterns
// Tokens: --color-bg #0A0A0F, --color-surface #14141B, --color-line rgba(255,255,255,0.08)
// Verified: vercel-react-best-practices + web-design-guidelines
import { BentoGrid, BentoCard } from "@/components/ui/aceternity/bento-grid"
export function DashboardBento({stats}:{stats:{wau:number, retention:string}}) {
  return (
    <BentoGrid className="max-w-[1200px] mx-auto gap-4">
      <BentoCard className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[12px] p-6" title="WAU" value={stats.wau} />
    </BentoGrid>
  )
}
