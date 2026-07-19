import Link from "next/link";
import { GrammarForm } from "../../../features/grammar/components/grammar-form";

export default function NewGrammarPage() {
  return <main className="mx-auto min-h-screen max-w-[820px] px-[18px] pt-[50px] pb-[70px] sm:px-9"><Link className="text-[10px] font-extrabold text-brand no-underline" href="/grammar">← 返回语法列表</Link><header className="my-[42px] mb-7"><p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-accent">NEW GRAMMAR</p><h1 className="my-2.5 font-display text-[clamp(30px,4vw,48px)] font-medium">新增语法</h1><p className="text-[13px] leading-7 text-muted">录入语法的基本含义、接续方式和详细使用说明。</p></header><GrammarForm /></main>;
}
