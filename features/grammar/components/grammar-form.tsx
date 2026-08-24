"use client";

import { useState,useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { GrammarInput } from "../schemas/grammar-schema";
import { jlptLevels } from "../schemas/grammar-schema";
import { generateGrammarSuggestion } from "../../../utils/gemini";

type Props = { initial?: GrammarInput; grammarId?: number };
const field =
  "w-full rounded-lg border border-line bg-[#fbfbf8] px-[13px] py-3 text-xs text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10";
const label =
  "grid gap-2 text-[10px] font-black tracking-[0.08em] text-[#5b685f]";

export function GrammarForm({ initial, grammarId }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch(
      grammarId ? `/api/grammar/${grammarId}` : "/api/grammar",
      {
        method: grammarId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = (await response.json()) as {
      data?: { id: number };
      error?: string;
    };
    setSubmitting(false);
    if (!response.ok || !result.data) {
      setError(result.error || "保存失败，请稍后重试");
      return;
    }
    router.push(`/grammar/${result.data.id}`);
    router.refresh();
  }

  useEffect(() => {
    const testGemini = async () => {
      const suggestion = await generateGrammarSuggestion();
      console.log(suggestion);
    };
    testGemini();
  }, []);

  return (
    <form
      className="grid gap-5 rounded-[14px] border border-line bg-white p-[22px] sm:p-8"
      onSubmit={submit}
    >
      {error && (
        <div
          className="rounded-lg border border-[#efd1ca] bg-[#fff0ed] px-[13px] py-[11px] text-[11px] text-[#8e3426]"
          role="alert"
        >
          {error}
        </div>
      )}
      <label className={label}>
        <span>语法名称 *</span>
        <input
          className={field}
          name="title"
          required
          maxLength={80}
          defaultValue={initial?.title}
          placeholder="例：〜だけに"
        />
      </label>
      <label className={label}>
        <span>中文含义 *</span>
        <textarea
          className={`${field} resize-y leading-7`}
          name="meaning"
          required
          maxLength={300}
          rows={3}
          defaultValue={initial?.meaning}
          placeholder="例：正因为……；不愧是……"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
        <label className={label}>
          <span>JLPT 等级 *</span>
          <select
            className={field}
            name="jlptLevel"
            defaultValue={initial?.jlptLevel || "N2"}
          >
            {jlptLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          <span>接续方式</span>
          <input
            className={field}
            name="structure"
            maxLength={500}
            defaultValue={initial?.structure}
            placeholder="普通形＋だけに"
          />
        </label>
      </div>
      <label className={label}>
        <span>详细解释</span>
        <textarea
          className={`${field} resize-y leading-7`}
          name="explanation"
          maxLength={5000}
          rows={8}
          defaultValue={initial?.explanation}
          placeholder="填写使用场景、语感、注意点和常见错误……"
        />
      </label>
      <div className="flex justify-end gap-2.5 border-t border-line pt-[22px]">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-line bg-white px-[17px] py-[11px] text-xs font-extrabold text-ink"
          onClick={() => router.back()}
        >
          取消
        </button>
        <button
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-brand px-[17px] py-[11px] text-xs font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-55"
          disabled={submitting}
        >
          {submitting ? "保存中…" : grammarId ? "保存修改" : "创建语法"}
        </button>
      </div>
    </form>
  );
}
