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

## 开发进度

- 8月22日 cloudflare上线

https://manabi-japanese-learning.skyforestlin.workers.dev/

1.登陆cloudflare账号 npx wrangler login 获取Accound ID
2.创建生产D1数据库 npx wrangler d1 create manabi-production 获取database_id
3.根目录下创建wrangler.jsonc文件，填入Account ID和database_id
4.修改vite.config.ts，与wrangler.jsonc绑定
5.迁移应用到生产D1
  npx wrangler d1 migrations list manabi-production --remote        #检查迁移项目
  npx wrangler d1 migrations apply manabi-production --remote       #执行项目迁移       
6.在pakage.json中新增部署脚本
7.生成Cloudflare类型
  npm run cf:typegen        #根目录下生成worker-configuration.d.ts文件
8.本地模拟生产环境 npm run preview
9.第一次部署
  npm run lint
  npm test
  npm run deploy
10.测试

- 8月23日 需求分析，研究AI api接入相关技术

准备在新增语法页面，添加AI补全内容功能。用户输入语法关键词后，AI自动补齐相关字段。

- 8月24日 开始AI接入实装