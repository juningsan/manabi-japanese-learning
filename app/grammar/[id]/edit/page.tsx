import Link from "next/link";
import { notFound } from "next/navigation";
import { GrammarForm } from "../../../../features/grammar/components/grammar-form";
import { findGrammar } from "../../../../features/grammar/server/repository";

export const dynamic = "force-dynamic";
export default async function EditGrammarPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id); if (!Number.isInteger(id)) notFound(); const item = await findGrammar(id); if (!item) notFound();
  return <main className="mx-auto min-h-screen max-w-[820px] px-[18px] pt-[50px] pb-[70px] sm:px-9"><Link className="text-[10px] font-extrabold text-brand no-underline" href={`/grammar/${id}`}>← 返回语法详情</Link><header className="my-[42px] mb-7"><p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-accent">EDIT GRAMMAR</p><h1 className="my-2.5 font-display text-[clamp(30px,4vw,48px)] font-medium">编辑 {item.title}</h1><p className="text-[13px] leading-7 text-muted">修改后会立即更新语法库中的内容。</p></header><GrammarForm grammarId={id} initial={{ title:item.title, meaning:item.meaning, structure:item.structure || "", jlptLevel:item.jlptLevel as "N1", explanation:item.explanation || "" }} /></main>;
}
