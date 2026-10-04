import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function VocabularyPage() {
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
        <div className="flex self-end gap-3.5 text-xs font-bold text-muted sm:gap-7">
          <Link className="hidden text-inherit no-underline sm:block" href="/">
            ホーム
          </Link>
          <Link className="hidden sm:block" href="/grammar">
            文法
          </Link>
          <Link className="border-b-2 border-brand text-brand no-underline" href="/vocabulary">
            単語
          </Link>
          <Link className="hidden sm:block" href="/notes">
            ノート
          </Link>
        </div>
      </nav>
      <section className="grid items-start gap-7 pt-10 pb-[38px] sm:flex sm:items-end sm:justify-between sm:pt-16">
        <div>
          <p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-accent">
            VOCABULARY LIBRARY
          </p>
          <h1 className="my-2.5 font-display text-[clamp(30px,4vw,48px)] font-medium">
            単語を覚えて、使える言葉に。
          </h1>
          <p className="text-[13px] leading-7 text-muted">
            JLPT の単語を、読み方・意味・例文とともに学び、使える語彙を一つずつ増やしていきます。
          </p>
        </div>
      </section>
    </main>
  );
}
