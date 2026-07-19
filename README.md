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
