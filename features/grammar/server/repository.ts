import { env } from "cloudflare:workers";
import { and, desc, eq, like, or, type SQL } from "drizzle-orm";
import { grammar } from "../../../db/schema";
import { getDb } from "../../../db";
import type { GrammarInput } from "../schemas/grammar-schema";

let initialized = false;

async function ensureGrammarTable() {
  if (initialized) return;
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS grammar (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      meaning TEXT NOT NULL,
      structure TEXT,
      jlpt_level TEXT NOT NULL,
      explanation TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS grammar_level_idx ON grammar (jlpt_level)"),
  ]);

  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM grammar").first<{ total: number }>();
  if (!count?.total) {
    await env.DB.batch([
      env.DB.prepare("INSERT INTO grammar (title, meaning, structure, jlpt_level, explanation) VALUES (?, ?, ?, ?, ?)").bind("〜に限って", "偏偏……；唯独……", "名词＋に限って", "N2", "用于表达平时不会发生的事情，偏偏在某个特殊时候发生。"),
      env.DB.prepare("INSERT INTO grammar (title, meaning, structure, jlpt_level, explanation) VALUES (?, ?, ?, ?, ?)").bind("〜だけに", "正因为……；不愧是……", "普通形＋だけに", "N2", "前项是后项理由，强调结果与原因相称。"),
      env.DB.prepare("INSERT INTO grammar (title, meaning, structure, jlpt_level, explanation) VALUES (?, ?, ?, ?, ?)").bind("〜ものだから", "因为……（解释原因）", "普通形＋ものだから", "N2", "常用于说明带有辩解语气的个人理由。"),
      env.DB.prepare("INSERT INTO grammar (title, meaning, structure, jlpt_level, explanation) VALUES (?, ?, ?, ?, ?)").bind("〜に違いない", "一定……；肯定……", "普通形＋に違いない", "N3", "表示说话人基于依据作出的强烈判断。"),
    ]);
  }
  initialized = true;
}

export async function listGrammar(search = "", level = "") {
  await ensureGrammarTable();
  const conditions: SQL[] = [];
  if (search) conditions.push(or(like(grammar.title, `%${search}%`), like(grammar.meaning, `%${search}%`))!);
  if (level) conditions.push(eq(grammar.jlptLevel, level));
  return getDb().select().from(grammar).where(conditions.length ? and(...conditions) : undefined).orderBy(desc(grammar.updatedAt));
}

export async function findGrammar(id: number) {
  await ensureGrammarTable();
  return (await getDb().select().from(grammar).where(eq(grammar.id, id)).limit(1))[0] ?? null;
}

export async function createGrammar(input: GrammarInput) {
  await ensureGrammarTable();
  return (await getDb().insert(grammar).values(input).returning())[0];
}

export async function updateGrammar(id: number, input: GrammarInput) {
  await ensureGrammarTable();
  return (await getDb().update(grammar).set({ ...input, updatedAt: new Date().toISOString() }).where(eq(grammar.id, id)).returning())[0] ?? null;
}

export async function deleteGrammar(id: number) {
  await ensureGrammarTable();
  return (await getDb().delete(grammar).where(eq(grammar.id, id)).returning())[0] ?? null;
}
