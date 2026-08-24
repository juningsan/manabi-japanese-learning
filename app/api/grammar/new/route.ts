import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "cloudflare:workers";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const requestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "语法名称不能为空")
    .max(80, "语法名称不能超过80个字符"),
});

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Gemini API Key 未配置" },
      { status: 500 },
    );
  }

  const parsed = requestSchema.safeParse(
    await request.json().catch(() => null),
  ); //请求数据必须符合schema。否则parsed.success返回false
  const prompt = `
    你是一名专业的日语教师，面向中文母语的日语学习者。

    请分析下面的日语语法：

    ${parsed.data?.title}

    请生成以下内容：

    1. meaning：简体中文含义，简洁准确。
    2. structure：日语接续方式，例如「动词普通形＋だけに」。
    3. jlptLevel：推测对应的 JLPT 等级，只能是 N1、N2、N3、N4 或 N5。
    4. explanation：使用简体中文说明使用场景、语感、注意事项，并提供一个日语例句及其中文翻译。

    要求：
    - 不要生成与该语法无关的内容。
    - 不确定 JLPT 等级时，选择最接近的等级。
    - 不要使用 Markdown。
    - 不要添加 JSON 之外的说明文字。
    `;

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "请求参数无效" },
      { status: 400 },
    );
  }

  const clientIp =
    request.headers.get("cf-connecting-ip") ?? "local-development";

  const { success } = await env.GEMINI_RATE_LIMITER.limit({
    key: `gemini:${clientIp}`,
  });

  if (!success) {
    return NextResponse.json(
      { error: "请求过于频繁，请一分钟后再试" },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      },
    );
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const suggestionSchema = z.object({
      meaning: z.string().trim().min(1).max(300),
      structure: z.string().trim().max(500),
      jlptLevel: z.enum(["N5", "N4", "N3", "N2", "N1"]),
      explanation: z.string().trim().max(5000),
    });

    const json: unknown = JSON.parse(response.text ?? "");
    const suggestion = suggestionSchema.parse(json);

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Gemini生成出错:", error);

    return NextResponse.json(
      { error: "AI 生成失败，请稍后重试" },
      { status: 502 },
    );
  }
}
