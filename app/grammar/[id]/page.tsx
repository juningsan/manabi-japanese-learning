import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteGrammar } from "../../../features/grammar/components/delete-grammar";
import { findGrammar } from "../../../features/grammar/server/repository";

export const dynamic = "force-dynamic";
export default async function GrammarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id); if (!Number.isInteger(id)) notFound(); const item = await findGrammar(id); if (!item) notFound();
  return (
    <main className="mx-auto min-h-screen max-w-[820px] px-[18px] pt-[50px] pb-[70px] sm:px-9">
      <Link className="text-[10px] font-extrabold text-brand no-underline" href="/grammar">← 返回语法列表</Link>
      <article className="mt-[42px] rounded-[14px] border border-line bg-white p-[22px] sm:p-8">
        <div className="grid gap-5 border-b border-line pb-7 sm:flex sm:items-start sm:justify-between"><div><span className="rounded bg-[#e5eee8] px-2 py-1 text-[9px] font-black tracking-[0.08em] text-brand">{item.jlptLevel}</span><h1 className="my-2.5 font-display text-[40px] font-medium">{item.title}</h1><p className="text-[#59665e]">{item.meaning}</p></div><div className="flex gap-2"><Link className="inline-flex items-center justify-center rounded-lg border border-line bg-white px-[17px] py-[11px] text-xs font-extrabold text-ink no-underline" href={`/grammar/${id}/edit`}>编辑</Link><DeleteGrammar id={id} /></div></div>
        <section className="border-b border-line py-7"><span className="text-[10px] font-black tracking-[0.08em] text-[#5b685f]">接続</span><div className="mt-3 rounded-lg bg-[#f3f5f1] p-[17px] font-display">{item.structure || "暂未填写接续方式"}</div></section>
        <section className="border-b border-line py-7"><span className="text-[10px] font-black tracking-[0.08em] text-[#5b685f]">解説</span><p className="mt-3 whitespace-pre-wrap text-[13px] leading-8 text-[#4f5b53]">{item.explanation || "暂未填写详细解释。"}</p></section>
        <footer className="pt-[22px] text-[9px] text-muted">创建于 {new Date(item.createdAt).toLocaleDateString("zh-CN")}</footer>
      </article>
    </main>
  );
}
