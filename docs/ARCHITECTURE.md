# 技术架构

- UI：React 19 + TypeScript + Tailwind CSS 4
- 框架：Next.js App Router（vinext Cloudflare runtime）
- 数据：Drizzle ORM + 本地 SQLite / Cloudflare D1
- 校验：构建、ESLint、Node 测试

数据访问集中在 `db/`；页面与路由位于 `app/`；后续业务模块按 `features/grammar`、`features/word`、`features/review` 拆分，避免在功能尚未出现时预建空目录。
