# William Lee · 个人网站

> 个人作品集与软件展示网站，包含平面设计作品、个人资料、自研软件下载等功能。

---

## 项目概览

本站是 **李伟（William Lee）** 的个人作品集网站，基于 React + Vite + Tailwind CSS 构建，使用 Framer Motion 驱动动效。采用中英双语设计，支持浅色 / 深色主题切换，无需后端，纯静态部署。

- **作者**：李伟 / William Lee
- **出生**：2002 年，四川
- **现居**：苏州
- **学历**：苏州工艺美术职业技术学院
- **方向**：视觉设计师 / 创意方向

---

## 在线访问

- **Vercel（国际）**: https://william-portfolio-main.vercel.app
  - ⚠️ 注意：中国大陆可能无法访问或速度较慢

---

## 核心功能

### 🎨 作品展示
- 瀑布流画廊展示平面设计作品
- 支持图片放大查看和视频预览
- 按分类筛选作品

### 💼 个人资料
- 关于我、学习经历、工作经验
- 中英文简历下载
- 软件工具展示

### 💻 个人软件
- **Start menu pro (SMP v.1.2)** - macOS/Linux 风格的资料管理软件
- 软件功能：资料整理、内容归档、快捷方式管理、搜索集成、密码管理、系统工具管理、日志库
- 7 张软件截图预览，支持点击放大查看
- 邀请码保护下载（管理员邀请码：`ADMIN2026`）

### 📞 联系方式
- 微信、BOSS直聘（可复制/查看）
- 电话号码（隐私保护，模糊显示）
- 纯白色界面设计

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
| **Navbar** | 吸顶导航，含"关于我"、"个人软件"锚点跳转、中英切换、深浅主题切换、联系 CTA |
| **About** | 个人简介、软件工具横向滚动展示、中英简历下载 |
| **Experience** | 基本信息（地点、求职意向、期望薪资）+ 工作经历时间线 |
| **Gallery** | 瀑布流画廊，展示平面设计作品，支持点击查看大图 / 视频 |
| **Contact** | 联系方式抽屉（微信、BOSS直聘优先，电话号码已模糊），点击一键复制 |
| **Footer** | 版权信息 |

### 子页面（Hash 路由）

| 路由 | 页面 | 说明 |
|------|------|------|
| `#/super-tools` | 个人软件 | Start menu pro 软件展示与下载，包含邀请码验证 |

---

## 个人软件模块详情

### Start menu pro (SMP v.1.2)

**功能特性：**
- macOS/Linux 风格界面设计
- 资料整理与内容归档
- 快捷方式管理
- 搜索集成
- 密码管理
- 系统工具管理
- 日志库

**页面功能：**
- 左侧：软件详细信息（版本、大小、系统要求、下载按钮）
- 右侧：7 张软件截图轮播展示
- 支持图片放大查看（全屏模态框）
- 点击下载需输入管理员邀请码（`ADMIN2026`）

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

### 国际访问
- **Vercel**：已部署至 https://william-portfolio-main.vercel.app
- **Netlify**：连接仓库，零配置自动部署
- **Cloudflare Pages**：同上

### 中国大陆访问
⚠️ **重要提示**：`.vercel.app` 域名在中国大陆可能无法访问或速度极慢。

**推荐方案：**
1. **GitHub Pages**（推荐）
   - 在中国访问相对稳定
   - 免费且易于部署
   - 需要创建 GitHub 仓库

2. **Gitee Pages**
   - 国内访问速度快
   - 需要实名认证

3. **国内云服务商**
   - 阿里云 OSS + CDN
   - 腾讯云静态网站托管
   - 七牛云
   - ⚠️ 需要域名备案

4. **自定义域名**
   - 如有已备案域名，可绑定到 Vercel
   - 访问稳定性大幅提升

---

## 项目更新记录

### 2026-06-20
- ✅ 完成个人软件页面开发
- ✅ 添加 Start menu pro (SMP v.1.2) 软件展示
- ✅ 实现软件截图预览和放大功能
- ✅ 添加邀请码下载保护机制
- ✅ 优化联系方式抽屉（纯白色界面，电话号码隐私保护）
- ✅ 移除基础教程导航项
- ✅ 首次部署到 Vercel

---

## License

本项目为个人私有作品集，源码仅供参考，未经授权禁止商业使用。
