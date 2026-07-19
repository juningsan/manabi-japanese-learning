import Link from "next/link";
import { GrammarCard } from "../../features/grammar/components/grammar-card";
import { jlptLevels } from "../../features/grammar/schemas/grammar-schema";
import { listGrammar } from "../../features/grammar/server/repository";

export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ q?: string; level?: string }> };

export default async function GrammarPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const level = params.level || "";
  const items = await listGrammar(q, level);
  return (
    <main className="mx-auto min-h-screen max-w-[1180px] px-[18px] pb-[70px] sm:px-9">
      <nav className="flex h-[82px] items-center justify-between border-b border-line">
        <Link
          className="flex items-center gap-3 text-ink no-underline"
          href="/"
        >
          <span className="grid size-[38px] place-items-center rounded-full bg-brand font-display text-xl text-white">
            日
          </span>
          <strong className="font-display text-lg tracking-[0.04em]">
            Manabi
          </strong>
        </Link>
        <div className="flex gap-3.5 text-xs font-bold text-muted sm:gap-7">
          <Link className="hidden text-inherit no-underline sm:block" href="/">
            ホーム
          </Link>
          <Link
            className="border-b-2 border-brand py-[31px] text-brand no-underline"
            href="/grammar"
          >
            文法
          </Link>
          <span className="hidden sm:block">単語</span>
          <span className="hidden sm:block">ノート</span>
        </div>
      </nav>
      <section className="grid items-start gap-7 pt-10 pb-[38px] sm:flex sm:items-end sm:justify-between sm:pt-16">
        <div>
          <p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-accent">
            GRAMMAR LIBRARY
          </p>
          <h1 className="my-2.5 font-display text-[clamp(30px,4vw,48px)] font-medium">
            文法を、理解から定着へ。
          </h1>
          <p className="text-[13px] leading-7 text-muted">
            JLPT 文法を整理し、接続・意味・使い方を一つずつ確実に身につけます。
          </p>
        </div>
        <Link
          className="inline-flex shrink-0 items-center justify-center justify-self-start rounded-lg bg-brand px-[17px] py-[11px] text-xs font-extrabold text-white no-underline"
          href="/grammar/new"
        >
          ＋ 新增语法
        </Link>
      </section>
      <form className="flex flex-wrap gap-2.5 rounded-xl border border-line bg-white p-3">
        <label className="basis-full sm:flex-1">
          <span className="sr-only">搜索语法</span>
          <input
            className="w-full rounded-lg border border-line bg-[#fbfbf8] px-[13px] py-3 text-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
            name="q"
            defaultValue={q}
            placeholder="语法名称或中文含义……"
          />
        </label>
        <label className="flex-1 sm:flex-none">
          <span className="sr-only">JLPT 等级</span>
          <select
            className="w-full rounded-lg border border-line bg-[#fbfbf8] px-[13px] py-3 text-xs outline-none focus:border-brand sm:w-[145px]"
            name="level"
            defaultValue={level}
          >
            <option value="">全部等级</option>
            {jlptLevels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button
          className="rounded-lg bg-[#e8eee9] px-[17px] py-[11px] text-xs font-extrabold text-brand"
          type="submit"
        >
          筛选
        </button>
        {(q || level) && (
          <Link
            className="self-center px-2 text-[11px] text-accent"
            href="/grammar"
          >
            清除
          </Link>
        )}
      </form>
      <div className="flex justify-between px-1 py-[18px] text-[10px] text-muted">
        <span>{items.length} 个语法项目</span>
        {q && <span>关键词：{q}</span>}
      </div>
      {items.length ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <GrammarCard item={item} key={item.id} />
          ))}
        </section>
      ) : (
        <section className="rounded-xl border border-line bg-white px-5 py-[70px] text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e8eee9] font-display text-[22px] text-brand">
            文
          </span>
          <h2 className="mt-[18px] mb-2 font-display text-[21px] font-medium">
            没有找到符合条件的语法
          </h2>
          <p className="mb-5 text-xs text-muted">
            尝试更换关键词或清除筛选条件。
          </p>
        </section>
      )}
    </main>
  );
}
