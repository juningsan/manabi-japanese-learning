import { z } from "zod";

export const jlptLevels = ["N5", "N4", "N3", "N2", "N1"] as const;

export const grammarSchema = z.object({
  title: z.string().trim().min(1, "语法名称不能为空").max(80, "语法名称不能超过 80 个字符"),
  meaning: z.string().trim().min(1, "中文含义不能为空").max(300, "中文含义不能超过 300 个字符"),
  structure: z.string().trim().max(500, "接续说明不能超过 500 个字符").optional().default(""),
  jlptLevel: z.enum(jlptLevels, { message: "请选择有效的 JLPT 等级" }),
  explanation: z.string().trim().max(5000, "详细解释不能超过 5000 个字符").optional().default(""),
});

export type GrammarInput = z.infer<typeof grammarSchema>;
