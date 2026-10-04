const nav = [
  { label: "ホーム", icon: "⌂", href: "#" },
  { label: "文法", icon: "文", href: "/grammar" },
  { label: "単語", icon: "単", href: "/vocabulary" },
  { label: "ノート", icon: "ノ", href: "/notes" },
  { label: "復習", icon: "↻", href: "/reviews" },
];

const reviews = [
  { word: "見直す", reading: "みなおす", meaning: "重新审视", level: "N2" },
  { word: "〜に限って", reading: "にかぎって", meaning: "偏偏……", level: "N2" },
  { word: "捗る", reading: "はかどる", meaning: "进展顺利", level: "N1" },
];

const eyebrow =
  "text-[10px] font-extrabold tracking-[0.16em] text-[#849087] uppercase";

export default function Home() {
  return (
    <main className="min-h-screen md:grid md:grid-cols-[82px_1fr] lg:grid-cols-[250px_1fr]">
      <aside className="sticky top-0 z-10 flex h-auto items-center border-b border-line bg-[#faf9f5] px-[18px] py-3.5 md:h-screen md:flex-col md:border-r md:border-b-0 md:px-3.5 md:py-6 lg:px-6 lg:pt-[34px]">
        <div className="flex items-center gap-3 md:mb-10 lg:mx-2 lg:w-full">
          <span className="grid size-[38px] shrink-0 place-items-center rounded-full bg-brand font-display text-xl text-white">
            日
          </span>
          <div className="hidden lg:block">
            <strong className="block font-display text-xl tracking-[0.04em]">
              Manabi
            </strong>
            <small className="mt-0.5 block text-[10px] tracking-[0.14em] text-muted">
              日本語ラボ
            </small>
          </div>
        </div>
        <nav
          className="ml-auto flex gap-1 md:ml-0 md:grid md:w-full md:gap-[7px]"
          aria-label="主导航"
        >
          {nav.map((item, index) => (
            <a
              className={`flex items-center justify-center gap-3.5 rounded-[9px] px-2.5 py-2.5 text-sm font-semibold no-underline transition-colors lg:justify-start lg:px-3.5 ${index === 0 ? "bg-[#e9eee9] text-brand" : "text-[#657168] hover:bg-[#e9eee9] hover:text-brand"}`}
              href={item.href}
              key={item.label}
            >
              <span className="w-[23px] text-center font-display">
                {item.icon}
              </span>
              <span className="hidden lg:inline">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto hidden w-full gap-2 rounded-xl bg-[#edf1ec] p-[18px] lg:grid">
          <span className={eyebrow}>今週の目標</span>
          <strong className="text-[13px]">5日間学習する</strong>
          <div className="h-1 overflow-hidden rounded-full bg-[#d2d9d2]">
            <i className="block h-full w-3/5 bg-accent" />
          </div>
          <small className="text-[10px] text-muted">3 / 5 日達成</small>
        </div>
        <a
          className="mt-5.5 hidden w-full items-center gap-2.5 text-inherit no-underline md:flex md:justify-center lg:justify-start"
          href="#settings"
        >
          <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#dbcfc2] font-display">
            悠
          </span>
          <div className="hidden flex-1 lg:block">
            <strong className="block text-xs">悠さん</strong>
            <small className="mt-0.5 block text-[9px] text-muted">
              JLPT N2 · 学習中
            </small>
          </div>
          <b className="hidden text-[10px] text-[#9aa29c] lg:block">•••</b>
        </a>
      </aside>

      <section className="mx-auto w-full max-w-[1450px] px-[18px] pt-7 pb-12 sm:px-[30px] md:px-[5vw] md:pt-11 md:pb-[70px]">
        <header className="mb-9 flex items-start justify-between gap-5 md:items-center">
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-accent">
              7月19日 · 日曜日
            </p>
            <h1 className="mb-2 font-display text-[clamp(25px,3vw,35px)] font-medium">
              おかえりなさい、悠さん。
            </h1>
            <p className="m-0 text-[13px] text-muted">
              今日も少しずつ、確実に前へ。
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              className="hidden rounded-lg border border-line bg-white px-3.5 py-2.5 text-ink sm:block"
              aria-label="通知"
            >
              ◌
            </button>
            <button className="rounded-lg border border-brand bg-brand px-3 py-2.5 text-base font-bold text-white sm:px-5 sm:text-xs">
              <span className="sm:hidden">＋</span>
              <span className="hidden sm:inline">＋ 学習を追加</span>
            </button>
          </div>
        </header>

        <section className="grid gap-[18px] lg:grid-cols-[1.7fr_1fr]">
          <article className="flex min-h-[225px] justify-between overflow-hidden rounded-[13px] border border-line bg-brand px-7 py-8 text-white sm:px-[38px] sm:py-[34px]">
            <div>
              <span className={`${eyebrow} text-[#c8d5cd]`}>
                今日のフォーカス
              </span>
              <h2 className="mt-[18px] mb-2.5 font-display text-[28px] font-medium">
                復習から始めましょう
              </h2>
              <p className="max-w-[420px] text-xs leading-[1.8] text-[#ccd8d1]">
                忘れかけている項目を、記憶が薄れる前にもう一度。
              </p>
              <a
                className="mt-[18px] inline-flex gap-9 border-b border-[#7c9b8c] pb-1.5 text-xs font-bold text-white no-underline"
                href="#review"
              >
                12件を復習する <span>→</span>
              </a>
            </div>
            <div
              className="hidden size-[152px] rotate-[-20deg] self-center rounded-full border-[18px] border-white/10 border-l-white/30 sm:grid sm:place-items-center"
              aria-hidden="true"
            >
              <span className="rotate-[20deg] font-display text-5xl opacity-70">
                復
              </span>
            </div>
          </article>
          <article className="rounded-[13px] border border-line bg-white px-[30px] py-[27px]">
            <span className={eyebrow}>連続学習</span>
            <div className="mt-2.5 flex items-baseline gap-2">
              <b className="font-display text-[50px] font-medium">12</b>
              <span className="text-[13px]">日</span>
            </div>
            <p className="mb-[23px] text-[10px] text-muted">
              自己ベストまであと3日
            </p>
            <div className="flex justify-between">
              {["月", "火", "水", "木", "金", "土", "日"].map((d, i) => (
                <span
                  className="grid gap-[7px] text-center text-[8px] text-[#939b96]"
                  key={d}
                >
                  <i
                    className={`grid size-[22px] place-items-center rounded-full not-italic ${i < 5 ? "bg-brand text-white" : "bg-[#f1f1ed]"}`}
                  >
                    {i < 5 ? "✓" : ""}
                  </i>
                  {d}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section
          className="my-[18px] grid overflow-hidden rounded-[13px] border border-line bg-line sm:grid-cols-3 sm:gap-px"
          aria-label="学习统计"
        >
          {[
            {
              label: "今週の学習",
              value: "4時間 35分",
              change: "先週比 ＋18%",
            },
            { label: "習得した単語", value: "286", change: "今週 ＋24語" },
            { label: "正答率", value: "82%", change: "先週比 ＋5%" },
          ].map((item) => (
            <article
              className="bg-white px-6 py-5 sm:px-[25px]"
              key={item.label}
            >
              <span className="block text-[10px] text-muted">{item.label}</span>
              <strong className="my-2 block font-display text-2xl font-medium">
                {item.value}
              </strong>
              <small className="block text-[10px] text-muted">
                {item.change}
              </small>
            </article>
          ))}
        </section>

        <section
          className="grid gap-[18px] lg:grid-cols-[1.7fr_1fr]"
          id="review"
        >
          <article className="rounded-[13px] border border-line bg-white px-5 py-[27px] sm:px-[30px]">
            <div className="flex items-start justify-between">
              <div>
                <span className={eyebrow}>今日の復習</span>
                <h2 className="mt-[7px] mb-5 font-display text-[19px] font-medium">
                  記憶を定着させる
                </h2>
              </div>
              <a className="text-[10px] text-brand no-underline" href="#all">
                すべて見る →
              </a>
            </div>
            <div>
              {reviews.map((item, i) => (
                <div
                  className="grid grid-cols-[25px_1fr_42px_35px] items-center gap-3 border-t border-[#ecece7] py-3.5 sm:grid-cols-[30px_1fr_1fr_42px_38px]"
                  key={item.word}
                >
                  <span className="font-display text-xs text-[#a3aaa5]">
                    0{i + 1}
                  </span>
                  <div>
                    <strong className="block font-display">{item.word}</strong>
                    <small className="mt-0.5 block text-[9px] text-muted">
                      {item.reading}
                    </small>
                  </div>
                  <p className="hidden text-[9px] text-muted sm:block">
                    {item.meaning}
                  </p>
                  <span className="rounded bg-[#f0f2ee] px-1.5 py-1 text-center text-[9px]">
                    {item.level}
                  </span>
                  <button
                    className="rounded-lg border border-line bg-white p-[7px] text-ink"
                    aria-label={`${item.word}を復習`}
                  >
                    →
                  </button>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-[13px] border border-line bg-white px-[30px] py-[27px]">
            <span className={eyebrow}>学習記録</span>
            <h2 className="mt-[7px] mb-5 font-display text-[19px] font-medium">
              今月の歩み
            </h2>
            <div className="my-3 grid grid-cols-7 gap-1.5">
              {Array.from({ length: 35 }, (_, i) => (
                <i
                  className={`aspect-square rounded-[3px] ${i % 7 === 0 || i % 9 === 0 ? "bg-[#35634d]" : i % 3 === 0 ? "bg-[#aac3b4]" : "bg-[#edf0eb]"}`}
                  key={i}
                />
              ))}
            </div>
            <div className="mt-7 flex border-t border-line pt-5">
              <div className="w-1/2">
                <strong className="block font-display text-[22px]">18</strong>
                <small className="mt-1 block text-[9px] text-muted">
                  学習日数
                </small>
              </div>
              <div className="w-1/2 border-l border-line pl-6">
                <strong className="block font-display text-[22px]">
                  1,248
                </strong>
                <small className="mt-1 block text-[9px] text-muted">
                  学習ポイント
                </small>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
