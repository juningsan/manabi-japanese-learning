import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { grammarSchema } from "../features/grammar/schemas/grammar-schema.ts";

test("dashboard links to the grammar library", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /href: "\/grammar"/);
});

test("grammar routes and form are present", async () => {
  const [list, detail, form, api] = await Promise.all([
    readFile(new URL("../app/grammar/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/grammar/[id]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../features/grammar/components/grammar-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/grammar/[id]/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(list, /listGrammar/);
  assert.match(detail, /findGrammar/);
  assert.match(form, /method: grammarId \? "PATCH" : "POST"/);
  assert.match(api, /export async function DELETE/);
});

test("grammar input validation rejects invalid data", () => {
  assert.equal(grammarSchema.safeParse({ title: "", meaning: "", jlptLevel: "N6" }).success, false);
  assert.equal(grammarSchema.safeParse({ title: "〜だけに", meaning: "正因为……", jlptLevel: "N2" }).success, true);
});
