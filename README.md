# Manabi — AI Japanese Learning Platform

面向 JLPT 学习者的日语学习平台。当前版本包含响应式 Dashboard、项目文档、第一版数据模型，以及可持久化的 Grammar CRUD。

## 本地运行

要求 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:3000`。

## 已实现页面

- `/`：学习 Dashboard
- `/grammar`：语法列表、关键词搜索和 JLPT 筛选
- `/grammar/new`：新增语法
- `/grammar/:id`：语法详情与删除
- `/grammar/:id/edit`：编辑语法

首次访问语法库时会自动创建本地数据表，并加入四条演示数据。

## 常用命令

```bash
npm run dev          # 本地开发
npm run build        # 生产构建验证
npm run lint         # 代码检查
npm run db:generate  # 生成数据库迁移
```

项目规划见 `docs/`。数据库采用 Drizzle + SQLite/D1，V1 数据模型包含 User、Grammar、Word、Note、Favorite 和 Review。

# 开发日志

## 8月22日：Cloudflare 上线

线上地址：[Manabi Japanese Learning](https://manabi-japanese-learning.skyforestlin.workers.dev/)

1. 登录 Cloudflare：

   ```bash
   npx wrangler login
   ```

   获取 Account ID。

2. 创建生产环境 D1 数据库：

   ```bash
   npx wrangler d1 create manabi-production
   ```

   获取 `database_id`。

3. 在项目根目录创建 `wrangler.jsonc`，填入 Account ID 和 `database_id`。

4. 修改 `vite.config.ts`，与 `wrangler.jsonc` 绑定。

5. 将数据库迁移到生产环境：

   ```bash
   # 检查待迁移项目
   npx wrangler d1 migrations list manabi-production --remote

   # 执行迁移
   npx wrangler d1 migrations apply manabi-production --remote
   ```

6. 在 `package.json` 中添加部署脚本。

7. 生成 Cloudflare 类型定义：

   ```bash
   npm run cf
   ```

   在项目根目录生成 `worker-configuration.d.ts`。

8. 本地模拟生产环境：

   ```bash
   npm run preview
   ```

9. 首次部署：

   ```bash
   npm run lint
   npm test
   npm run deploy
   ```

10. 测试线上应用。

## 8月23日：AI 功能需求分析

- 调研 AI API 接入方案。
- 计划在“新增语法”页面添加 AI 内容补全功能。
- 用户输入语法关键词后，由 AI 自动补全相关字段。

## 8月24日：AI 接入开发

- 开始实现 AI 接入与语法信息自动补全功能。

1. 获取 Gemini API Key，并在 `.env.local` 中配置环境变量。
2. 新增 `/api/grammar/new` API Route，用于处理语法信息自动补全请求。
3. 在根目录新增 `utils` 目录，并创建 `Gemini.ts`，封装 Gemini API 调用逻辑。
4. 调整相关页面与接口逻辑，为后续实现「输入语法 → AI 自动生成含义、接续、用法等字段」做准备。