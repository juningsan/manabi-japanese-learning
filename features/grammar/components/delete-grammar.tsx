"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteGrammar({ id }: { id: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function remove() {
    if (!window.confirm("确定删除这条语法吗？此操作无法撤销。")) 
      return;
    setBusy(true);
    const response = await fetch(`/api/grammar/${id}`, { method: "DELETE" });
    if (response.ok) {
      window.location.assign("/grammar");
      return;
    }
    setBusy(false);
    window.alert("删除失败，请稍后重试。");
  }
  return (
    <button
      className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#efd1ca] bg-[#fff0ed] px-[17px] py-[11px] text-xs font-extrabold text-[#a33d2d] disabled:cursor-not-allowed disabled:opacity-55"
      disabled={busy}
      onClick={remove}
    >
      {busy ? "删除中…" : "删除"}
    </button>
  );
}
