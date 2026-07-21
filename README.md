# howtodelete.me

一个全面的账号删除指南网站，帮助用户永久删除数千个网站和服务的在线账号。

A comprehensive account deletion guide to help users permanently delete online accounts across thousands of websites and services.

Live: [https://howtodelete.me](https://howtodelete.me)

---

## 功能特性 / Features

- 🔍 **搜索功能 / Search** - 查找任何服务的删除指南 / Find deletion guides for any service
- 📱 **响应式设计 / Responsive** - 在所有设备上完美运行 / Works perfectly on all devices
- 🎯 **分类浏览 / Categories** - 按类别或难度筛选 / Filter by category or difficulty
- 🌍 **多语言支持 / Multi-language** - 支持中英文切换 / Chinese & English support
- ⚡ **静态生成 / Static Generation** - 通过 SSG + ISR 优化加载速度 / Optimized with SSG + ISR
- 🔒 **注重隐私 / Privacy First** - 最少数据收集 / Minimal data collection
- 🎨 **现代 UI / Modern UI** - 基于 shadcn/ui 的设计系统 / Built on shadcn/ui
- 📈 **广告集成 / Ads** - Adsterra + Google AdSense

## 技术栈 / Tech Stack

- **框架 / Framework**: Next.js 16 (App Router + Turbopack)
- **样式 / Styling**: Tailwind CSS v4
- **UI 组件 / UI Components**: shadcn/ui + Lucide Icons
- **语言 / Language**: TypeScript
- **包管理 / Package Manager**: pnpm
- **部署 / Deployment**: Vercel

## 快速开始 / Quick Start

### 前置要求 / Prerequisites

- Node.js 18+
- pnpm

### 安装 / Install

```bash
pnpm install
```

### 加载完整数据集 / Load Full Dataset

项目默认只包含少量示例数据。要加载完整的网站数据：
The project includes minimal sample data by default. To load the full dataset:

```bash
python scripts/load-full-data.py
```

或手动复制 / Or manually copy `user_read_only_context/text_attachments/sites_detailed-TRf5e.json` 到 / to `lib/data/sites_detailed.json`。

### 开发 / Dev

```bash
pnpm dev
```

打开 / Open [http://localhost:3000](http://localhost:3000)。

### 生产构建 / Production Build

```bash
pnpm build
pnpm start
```

## 项目结构 / Project Structure

```
├── app/
│   └── [locale]/              # 多语言路由 / Multi-language routes
│       ├── [slug]/            # 指南详情页 / Guide detail page
│       ├── category/          # 分类页 / Category page
│       ├── search/            # 搜索页 / Search page
│       ├── contact/           # 联系我们 / Contact
│       ├── privacy/           # 隐私政策 / Privacy
│       ├── terms/             # 服务条款 / Terms
│       └── disclaimer/        # 免责声明 / Disclaimer
├── components/
│   ├── ui/                    # shadcn/ui 组件 / shadcn/ui components
│   ├── ads/                   # 广告组件 / Ad components
│   ├── site-header.tsx        # 导航栏 / Navbar
│   ├── site-footer.tsx        # 页脚 / Footer
│   └── ...
├── lib/
│   ├── data/                  # 指南数据 / Guide data
│   │   └── sites_detailed.json
│   └── utils/                 # 工具函数 / Utilities (i18n, SEO, translations)
├── scripts/
│   └── load-full-data.py
└── public/                    # 静态资源 / Static assets
```

## 数据结构 / Data Structure

指南存储在  / Guides stored in `lib/data/sites_detailed.json`：

```json
{
  "name": "服务名称 / Service Name",
  "url": "https://deletion-url.com",
  "domains": ["domain.com"],
  "difficulty": "easy|medium|hard|limited-availability|impossible",
  "notes": "删除说明 / Deletion notes",
  "email": "contact@example.com"
}
```

### 难度级别 / Difficulty Levels

| 级别 / Level | 含义 / Meaning |
|-------------|---------------|
| easy | 简单流程，可直接在设置中删除 / Simple process, deletable in settings |
| medium | 需要一些额外步骤 / Requires some extra steps |
| hard | 需要联系客服 / Requires contacting support |
| limited-availability | 仅特定地区可删除 / Only available in certain regions |
| impossible | 无法删除 / Cannot be deleted |

## SEO

- 动态 meta 标签 / Dynamic meta tags (title, description, keywords)
- Open Graph + Twitter Card
- JSON-LD 结构化数据 / Structured data (HowTo Schema)
- XML Sitemap
- 多语言 alternate links / Multi-language alternate links
- 1280px 最大宽度居中布局 / 1280px max-width centered layout

## 环境变量 / Environment Variables

```env
NEXT_PUBLIC_BASE_URL=https://howtodelete.me
NEXT_PUBLIC_ENABLE_ADS=true
NEXT_PUBLIC_GA_ID=                        # Google Analytics ID (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=     # Search Console verification (optional)
```

## 许可证 / License

MIT License

---

## 相关网站 / Related Websites

- [7-zip download](https://7zip.world) — 7-zip download
- [818 area code](https://818.pw) — 818 area code
- [Bandizip](https://bandizip.world) — bandizip
- [Bitumen Calculator](https://bitumencalculator.world) — bitumen calculator
- [Car Logos](https://carbrandindex.com) — car logos
- [Online Counter Tools](https://counter.best) — online counter tools
- [CPM Calculator](https://cpmcalculator.world) — Calculate the CPM
- [DownloadAll](https://downloadall.app) — downloadall
- [MX Record Lookup](https://emailtoolbox.io) — MX Record Lookup
- [Cyber Security Assessment](https://evaluationcat.com) — Cyber Security Assessment
- [Elven Name Generator](https://fantasyname.world) — Elven Name Generator
- [Favicon Generator](https://favicon.pub) — Favicon Generator
- [How to Delete](https://howtodelete.me) — How to Delete
- [Market Hours](https://markethours.io) — Market Hours
- [Morse Code Translator](https://mingle-mangle.com) — Morse Code Translator
- [All National Flag](https://nationalflag.io) — All National Flag
- [Password Remover](https://passwordremover.org) — Password Remover
- [Random Place Generator](https://placegenerator.com) — Random Place Generator
- [Play Virtual Piano](https://playpiano.me) — Play Virtual Piano
- [Power Wheels Brands](https://powerwheels.world) — Power Wheels Brands
- [Random Pokemon Generator](https://randompokemon.online) — Random Pokemon generator
- [Regex Generator](https://regexbox.com) — regex generator
- [Online Scoreboard](https://scoreboard.best) — online scoreboard
- [ShareX](https://sharex.best) — sharex
- [Stadium View](https://stadiview.com) — stadium view
- [Symbol](https://symbol.blog) — symbol
- [VLC Media Player](https://vlcmediaplayer.online) — vlc media player
- [Warm Moments](https://warmmoments.app) — warm moments
- [Electricity Bill Calculator](https://wattly.world) — Electricity Bill Calculator
- [WizTree](https://wiztree.world) — wiztree
- [Void Image Viewer](https://voidimageviewer.com) — voidimageviewer
