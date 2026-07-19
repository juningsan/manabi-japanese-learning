import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manabi — AI 日本語学習プラットフォーム",
  description: "文法・単語・復習をひとつにまとめた、日本語学習ダッシュボード。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
