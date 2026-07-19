import { NextResponse } from "next/server";
import { grammarSchema } from "../../../features/grammar/schemas/grammar-schema";
import { createGrammar, listGrammar } from "../../../features/grammar/server/repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await listGrammar(searchParams.get("q")?.trim() || "", searchParams.get("level") || "");
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const parsed = grammarSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "输入内容无效" }, { status: 400 });
  return NextResponse.json({ data: await createGrammar(parsed.data) }, { status: 201 });
}
