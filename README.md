# William Lee · 个人网站

> 个人测试与实验性项目，用于存放私人信息、展示个人资料、便捷下载文件，后期将逐步完善为正式个人网站。

---

## 项目概览

本站是 **李伟（William Lee）** 的个人作品集网站，基于 React + Vite + Tailwind CSS 构建，使用 Framer Motion 驱动动效。采用中英双语设计，支持浅色 / 深色主题切换，无需后端，纯静态部署。

- **作者**：李伟 / William Lee
- **出生**：2002 年，四川
- **现居**：苏州
- **学历**：苏州工艺美术职业技术学院
- **方向**：视觉设计师 / 创意方向

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 18 |
| 构建 | Vite 5 |
| 样式 | Tailwind CSS 3 + 自定义 CSS 变量 |
| 动效 | Framer Motion 11 |
| 路由 | 手写 Hash 路由（无 React Router） |
| 字体 | Inter · DM Sans |
| 部署 | 静态文件（可直接托管至 Vercel / Netlify / Cloudflare Pages） |

---

## 目录结构

```
william-portfolio-main/
├── public/
│   ├── favicon.ico
│   ├── icons/tools/          # 工具图标 SVG（PS、AI、CDR、Blender 等）
│   ├── media/
│   │   └── gallery/
│   │       ├── design/       # 16 个平面设计项目文件夹（.webp 图片）
│   │       └── dynamic/      # 动态 / 视频内容（运行时添加）
│   └── resumes/
│       ├── resume-cn.pdf
│       └── resume-en.pdf
├── src/
│   ├── App.jsx               # 路由调度、全局状态（语言、主题、弹窗）
│   ├── main.jsx
│   ├── components/
│   │   ├── layout/           # Navbar · Footer
│   │   ├── motion/           # FadeInView（视口进场动画封装）
│   │   ├── sections/         # 各首页 Section 组件
│   │   └── ui/               # 通用 UI 组件
│   ├── i18n/
│   │   ├── siteCopy.js       # 全站中英文 UI 文案
│   │   ├── portfolioData.js  # 个人资料、技能、工作经历、项目数据
│   │   ├── generatedGalleryData.js  # 脚本自动生成的画廊索引
│   │   ├── libraryData.js    # 数字图书馆数据
│   │   └── tutorialsData.js  # 基础教程数据
│   ├── pages/                # 子页面组件
│   └── styles/globals.css    # 设计 Token · 全局样式
├── scripts/
│   └── generate-gallery-index.mjs  # 画廊图片自动索引脚本
├── vite.config.js
└── tailwind.config.js
```

---

## 页面与模块

### 首页（`/`）

按从上到下顺序排列：

| 区块 | 说明 |
|------|------|
| **Navbar** | 吸顶导航，含页面锚点跳转、中英切换、深浅主题切换、联系 CTA |
| **Gallery** | 瀑布流画廊，展示平面设计作品，支持按分类筛选、点击查看大图 / 视频 |
| **About** | 个人简介、软件工具横向滚动展示、中英简历下载 |
| **Experience** | 基本信息（地点、求职意向、期望薪资）+ 工作经历时间线 |
| **Contact** | 联系方式抽屉（手机、微信），点击一键复制 |
| **Footer** | 版权信息 |

### 子页面（Hash 路由）

| 路由 | 页面 | 说明 |
|------|------|------|
| `#/library` | 数字图书馆 | 书籍 / PDF 下载卡片网格 |
| `#/tutorials` | 基础教程 | 折叠式教程列表，含难度标签 |
| `#/super-tools` | 神秘工具 | 密码验证后可见的工具下载页 |

---

## 画廊系统

画廊图片通过脚本自动索引，无需手动维护数据文件。

**工作流程：**

1. 将图片文件夹放入 `public/media/gallery/design/`
2. 运行索引脚本（见下方命令），自动生成 `src/i18n/generatedGalleryData.js`
3. 每个文件夹对应一个项目卡片，首张图片作为封面

**当前收录：** 16 个平面设计项目，图片格式均为 `.webp`。

> ⚠️ **注意**：脚本在 Windows 环境下读取含中文的文件名时存在 GBK / UTF-8 编码问题，生成后需检查 `generatedGalleryData.js` 中的中文路径是否正确。

---

## 视觉设计系统

### 配色

| Token | 值 | 用途 |
|-------|----|------|
| `ink` | `#0A0A0A` | 主文字 / 主 UI 色 |
| `stone.warm` | `#F5F3EF` | 浅色背景 |
| `accent.blue` | `#5B6CFF` | 强调蓝 |
| `accent.gold` | `#C9A96E` | 强调金 |

### 背景

- 浅色：暖米白渐变 + 顶部靛蓝径向光晕
- 深色：近黑渐变 + 靛蓝光晕
- 两个慢速漂浮的模糊色块（22s / 26s 无限循环）
- 点阵噪点纹理叠加（低透明度）

### 组件类

| 类名 | 作用 |
|------|------|
| `.section-shell` | 内容区最大宽度 84rem，响应式水平 padding |
| `.glass-panel` | 毛玻璃卡片（`bg-white/70 backdrop-blur-xl`） |
| `.navbar-panel` | 导航栏专用，近不透明深色 / 浅色 |
| `.ui-hover-lift` | 悬停微抬效果（仅鼠标设备） |
| `.eyebrow` | 小号全大写标签文字 |

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 重新生成画廊索引（新增图片后执行）
node scripts/generate-gallery-index.mjs

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 无障碍 & 性能

- 遵循 `prefers-reduced-motion`，所有 Framer Motion 动效在用户开启系统减弱动态时自动禁用
- 图片使用 `.webp` 格式，显著减小体积
- `framer-motion` 单独拆包（`manualChunks`），避免污染主 bundle
- 图片懒加载（`LazyImage` 组件 + IntersectionObserver）

---

## 部署

纯静态输出，`npm run build` 后将 `dist/` 目录托管至任意静态服务即可：

- **Vercel**：连接仓库，零配置自动部署
- **Netlify**：同上
- **Cloudflare Pages**：同上
- **手动**：将 `dist/` 上传至服务器，配置 SPA 回退（所有路由指向 `index.html`）

---

## License

本项目为个人私有作品集，源码仅供参考，未经授权禁止商业使用。
