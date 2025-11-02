# howtodelete.me

一个全面的账号删除指南网站，帮助用户永久删除数千个网站和服务的在线账号。

## 功能特性

- 🔍 **搜索功能** - 查找任何服务的删除指南
- 📱 **响应式设计** - 在所有设备上完美运行
- 🎯 **分类指南** - 按类别或难度浏览
- ⚡ **快速性能** - 通过静态生成优化速度
- 🔒 **注重隐私** - 无跟踪，无数据收集
- ♿ **无障碍访问** - 考虑了可访问性
- 🎨 **现代UI** - 使用 shadcn/ui 的简洁直观界面
- 🌍 **多语言支持** - 支持中英文切换

## 技术栈

- **框架**: Next.js 16 with App Router
- **样式**: Tailwind CSS v4
- **UI组件**: shadcn/ui
- **TypeScript**: 完整的类型安全
- **SEO**: 结构化数据、站点地图和元标签

## 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装步骤

1. 克隆仓库
2. 安装依赖：
   \`\`\`bash
   npm install
   \`\`\`

3. **加载完整数据集（重要）**：
   
   项目默认只包含5个示例网站。要加载完整的2339个网站数据，运行：
   \`\`\`bash
   python scripts/load-full-data.py
   \`\`\`
   
   或者手动复制 `user_read_only_context/text_attachments/sites_detailed-TRf5e.json` 到 `lib/data/sites_detailed.json`

4. 运行开发服务器：
   \`\`\`bash
   npm run dev
   \`\`\`

5. 打开 [http://localhost:3000](http://localhost:3000)

### 生产构建

\`\`\`bash
npm run build
npm start
\`\`\`

## 项目结构

\`\`\`
├── app/                    # Next.js app 目录
│   ├── [slug]/            # 动态指南页面
│   ├── category/          # 分类页面
│   ├── difficulty/        # 难度筛选页面
│   ├── search/            # 搜索结果
│   └── ...                # 其他页面
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── site-header.tsx   # 网站头部（带图标导航）
│   ├── site-footer.tsx   # 网站底部
│   ├── guide-card.tsx    # 指南卡片（难度颜色编码）
│   └── ...               # 自定义组件
├── lib/                   # 工具和数据
│   ├── data/             # 指南数据和处理
│   │   ├── sites_detailed.json  # 网站数据（需要加载）
│   │   └── guides.ts     # 数据处理函数
│   ├── utils/            # 辅助函数
│   └── types.ts          # TypeScript 类型
├── scripts/              # 实用脚本
│   └── load-full-data.py # 加载完整数据集
└── public/               # 静态资源
\`\`\`

## 数据结构

指南存储在 `lib/data/sites_detailed.json` 中，结构如下：

\`\`\`json
{
  "name": "服务名称",
  "url": "https://deletion-url.com",
  "domains": ["domain.com"],
  "difficulty": "easy|medium|hard|limited-availability|impossible",
  "notes": "删除过程的描述",
  "email": "contact@example.com"
}
\`\`\`

### 难度级别

- **easy** - 简单流程，可直接在设置中删除
- **medium** - 需要一些额外步骤
- **hard** - 无法完全删除，需要联系客服
- **limited-availability** - 仅在有隐私权的地区可删除
- **impossible** - 无法删除

## 设计特性

- **1280px 最大宽度** - PC端内容居中显示
- **黑色导航栏** - 白色文字，红色激活/悬停状态
- **难度颜色编码** - 整个卡片背景根据难度显示不同颜色
- **图标导航** - 使用 Lucide 图标增强可用性
- **语言切换** - 导航栏右侧的语言切换按钮

## 性能优化

- 所有页面的静态站点生成
- 数据处理记忆化
- 组件记忆化
- 优化的图片和资源
- 最小化的 JavaScript 包

## SEO 功能

- 所有页面的动态元标签
- Open Graph 和 Twitter Card 支持
- JSON-LD 结构化数据
- XML 站点地图生成
- robots.txt 配置

## 环境变量

在 Vercel 项目设置或 `.env.local` 文件中设置：

\`\`\`env
NEXT_PUBLIC_SITE_URL=https://howtodelete.me
\`\`\`

可选变量：
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console 验证

## 贡献

欢迎贡献！请随时提交问题或拉取请求。

## 许可证

MIT License - 可自由使用此项目。

## 致谢

- 数据来源于用户提供的 sites_detailed.json
- 使用 [Next.js](https://nextjs.org) 构建
- UI 组件来自 [shadcn/ui](https://ui.shadcn.com)
- 图标来自 [Lucide Icons](https://lucide.dev)
