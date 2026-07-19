import Link from "next/link";
import type { GrammarItem } from "../types/grammar";

export function GrammarCard({ item }: { item: GrammarItem }) {
  return (
    <article className="group rounded-xl border border-line bg-white p-[23px] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(24,45,35,0.07)]">
      <div className="flex justify-between"><span className="rounded bg-[#e5eee8] px-2 py-1 text-[9px] font-black tracking-[0.08em] text-brand">{item.jlptLevel}</span><span className="font-display text-[10px] text-[#a5ada8]">#{String(item.id).padStart(3, "0")}</span></div>
      <h2 className="mt-5 mb-2 font-display text-2xl font-medium"><Link className="text-inherit no-underline" href={`/grammar/${item.id}`}>{item.title}</Link></h2>
      <p className="min-h-9 text-xs text-[#59665e]">{item.meaning}</p>
      <div className="my-[18px] border-y border-line py-[13px] text-[11px]"><span className="mr-4 text-[9px] text-muted">接続</span>{item.structure || "—"}</div>
      <Link className="text-[10px] font-extrabold text-brand no-underline" href={`/grammar/${item.id}`}>詳しく見る <span className="inline-block transition-transform group-hover:translate-x-1">→</span></Link>
    </article>
  );
}
