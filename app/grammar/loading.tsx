export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-[1180px] px-[18px] sm:px-9">
      <div
        className="grid min-h-[70vh] place-items-center text-xs text-muted"
        role="status"
      >
        正在读取语法库……
      </div>
    </main>
  );
}
