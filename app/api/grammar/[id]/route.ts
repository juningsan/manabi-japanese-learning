import { NextResponse } from "next/server";
import { grammarSchema } from "../../../../features/grammar/schemas/grammar-schema";
import {
  deleteGrammar,
  findGrammar,
  updateGrammar,
} from "../../../../features/grammar/server/repository";

type Context = { params: Promise<{ id: string }> };
async function readId(context: Context) {
  const id = Number((await context.params).id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(_: Request, context: Context) {
  const id = await readId(context);
  if (!id)
    return NextResponse.json({ error: "无效的语法 ID" }, { status: 400 });
  const data = await findGrammar(id);
  return data
    ? NextResponse.json({ data })
    : NextResponse.json({ error: "语法不存在" }, { status: 404 });
}
export async function PATCH(request: Request, context: Context) {
  const id = await readId(context);
  if (!id)
    return NextResponse.json({ error: "无效的语法 ID" }, { status: 400 });
  const parsed = grammarSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "输入内容无效" },
      { status: 400 },
    );
  const data = await updateGrammar(id, parsed.data);
  return data
    ? NextResponse.json({ data })
    : NextResponse.json({ error: "语法不存在" }, { status: 404 });
}
export async function DELETE(_: Request, context: Context) {
  const id = await readId(context);
  if (!id)
    return NextResponse.json({ error: "无效的语法 ID" }, { status: 400 });
  const data = await deleteGrammar(id);
  return data
    ? NextResponse.json({ data })
    : NextResponse.json({ error: "语法不存在" }, { status: 404 });
}
