export const categories = [
  { id: 'all', label: { zh: '全部', en: 'All' } },
  { id: 'branding', label: { zh: '品牌识别', en: 'Branding' } },
  { id: 'editorial', label: { zh: '编辑设计', en: 'Editorial' } },
  { id: 'digital', label: { zh: '数字体验', en: 'Digital' } },
  { id: 'campaign', label: { zh: '传播视觉', en: 'Campaign' } },
]

const media = (path) => path

const createAsset = (base, name) => ({
  src: media(`/images/projects/${base}/${name}.svg`),
  fallback: media(`/images/projects/${base}/${name}.svg`),
})

// 新媒体路径生成器
const createMediaPaths = (slug) => ({
  mediaBase: `/media/gallery/${slug}`,
  coverSrc: `/media/gallery/${slug}/cover.webp`,
  gallery: [
    `/media/gallery/${slug}/01.webp`,
    `/media/gallery/${slug}/02.webp`,
    `/media/gallery/${slug}/03.webp`,
  ],
  previewVideo: `/media/gallery/${slug}/preview.mp4`,
})

const createImageSet = (base) => ({
  thumb: createAsset(base, 'thumb'),
  cover: {
    preview: createAsset(base, 'thumb'),
    full: createAsset(base, 'hires'),
  },
  gallery: [
    {
      preview: createAsset(base, 'detail-1-thumb'),
      full: createAsset(base, 'detail-1'),
    },
    {
      preview: createAsset(base, 'detail-2-thumb'),
      full: createAsset(base, 'detail-2'),
    },
  ],
})

export const profile = {
  name: { zh: '李伟', en: 'William Lee' },
  title: { zh: '视觉设计师 / 创意方向', en: 'Creative Designer / Visual Direction' },
  location: {
    zh: '常驻上海，可远程协作',
    en: 'Based in Shanghai · Available for remote collaboration',
  },
  intro: {
    zh: '我关注品牌识别、编辑设计与数字呈现中的节奏与留白，希望作品既克制，也能被长期地观看与理解。',
    en: 'I work across identity, editorial design, and digital presentation, with a focus on rhythm, restraint, and work that holds up over time.',
  },
  about: {
    zh: [
      '您好您好，我是网站管理员，02 四川人，12 年定居苏州，喜欢探索新事物，把灵感转化为可见的实体，网站是个人博客，此页面用于展示资料头像就不放了，不是很上镜',
    ],
    en: [
      'Hello visitor, I am the builder of this website. I was born in 2002 in Sichuan, China and settled in Suzhou in 2012. I graduated from Suzhou Art & Design Technology Institute.',
      'I enjoy exploring new things and tend to test ideas through hands-on practice, turning inspiration into something real and visible. I like landscapes, and I am drawn to things with a hardcore, powerful, and substantial quality, such as network information, real history, economics, logic, hardware assembly, and unknown fields.',
      'This website is a personal test and experiment. It is used to store private information, present a small part of my personal profile, and provide convenient file downloads. In the future, it will gradually evolve from an experimental space into a more formal personal website.',
    ],
  },
  contact: {
    email: 'alexchen@example.com',
    instagram: 'https://instagram.com/alexchen',
    behance: 'https://behance.net/alexchen',
  },
}

export const skills = [
  {
    id: 'identity',
    title: { zh: '品牌识别系统', en: 'Brand Identity Systems' },
    items: {
      zh: ['品牌定位梳理', '视觉语言搭建', '品牌延展规范'],
      en: ['Positioning frameworks', 'Visual language systems', 'Scalable brand applications'],
    },
  },
  {
    id: 'editorial',
    title: { zh: '编辑与内容设计', en: 'Editorial & Content Design' },
    items: {
      zh: ['版式与信息节奏', '出版与海报系统', '长内容阅读体验'],
      en: ['Editorial pacing', 'Publication and poster systems', 'Long-form reading experiences'],
    },
  },
  {
    id: 'digital',
    title: { zh: '数字视觉呈现', en: 'Digital Visual Presentation' },
    items: {
      zh: ['项目展示页面', '发布页视觉方向', '轻量动效叙事'],
      en: ['Portfolio and showcase pages', 'Launch page direction', 'Motion with a restrained narrative'],
    },
  },
]

export const projects = [
  {
    id: 'lumiere-identity',
    category: 'branding',
    year: '2025',
    client: { zh: '露米埃影像工作室', en: 'Lumière Studio' },
    featured: true,
    title: { zh: '露米埃品牌识别', en: 'Lumière Identity' },
    summary: {
      zh: '围绕摄影工作室的气质建立品牌识别系统，强调留白、字体秩序与温和而稳定的视觉节奏。',
      en: 'A visual identity for a portrait studio built around restraint, typographic order, and a warmer editorial cadence.',
    },
    description: {
      zh: '这个项目为一家摄影工作室建立完整的品牌基础，包括主标识、辅助图形、印刷应用与数字发布视觉。最终呈现的重点不是夸张的风格，而是一种细腻、克制且值得长期观看的整体气质。',
      en: 'This project defined the core identity for a photography studio, spanning logo, supporting graphics, print applications, and launch visuals for digital use. The aim was not a loud aesthetic, but a tone that feels refined, assured, and quietly distinctive.',
    },
    metrics: {
      zh: ['品牌识别系统', '编辑物料', '创意方向'],
      en: ['Identity system', 'Editorial assets', 'Creative direction'],
    },
    tags: {
      zh: ['品牌', '字体', '印刷'],
      en: ['Identity', 'Typography', 'Print'],
    },
    ...createMediaPaths('lumiere-identity'),
    ...createImageSet('lumiere'),
  },
  {
    id: 'noir-notes',
    category: 'editorial',
    year: '2024',
    client: { zh: '独立刊物', en: 'Independent Journal' },
    featured: true,
    title: { zh: '黑色笔记', en: 'Noir Notes' },
    summary: {
      zh: '一次围绕网格、页边与图像节奏展开的编辑改版，让阅读体验更沉浸也更有呼吸感。',
      en: 'An editorial redesign shaped around grid, margin, and image pacing to support a more immersive reading experience.',
    },
    description: {
      zh: '这个系统没有继续叠加视觉噪音，而是通过版式、层级与图像控制，让文字本身拥有更清晰的节奏与观看焦点。',
      en: 'Rather than adding visual noise, the system refines layout, hierarchy, and image restraint so the writing itself can hold a clearer rhythm and point of focus.',
    },
    metrics: {
      zh: ['编辑设计', '网格系统', '刊物模板'],
      en: ['Editorial design', 'Grid system', 'Issue templates'],
    },
    tags: {
      zh: ['编辑', '版式', '出版'],
      en: ['Editorial', 'Layout', 'Publishing'],
    },
    ...createMediaPaths('noir-notes'),
    ...createImageSet('noir'),
  },
  {
    id: 'aether-web',
    category: 'digital',
    year: '2025',
    client: { zh: '以太香氛', en: 'Aether Fragrance' },
    featured: true,
    title: { zh: 'Aether 数字体验', en: 'Aether Web Experience' },
    summary: {
      zh: '为香氛发布构想的一页式微型网站，通过更慢的节奏与克制的动效来承接产品叙事。',
      en: 'A launch microsite concept for a fragrance release, using slower pacing and restrained motion to frame the product story.',
    },
    description: {
      zh: '这个项目关注的不是信息堆叠，而是呈现顺序：图像、留白与文字如何以更从容的时间感逐步展开。',
      en: 'The focus here is not information density, but sequence—how imagery, whitespace, and copy can unfold with a more deliberate sense of timing.',
    },
    metrics: {
      zh: ['数字视觉', '动效语言', '页面方向'],
      en: ['Digital visuals', 'Motion language', 'Page direction'],
    },
    tags: {
      zh: ['数字', '高端', '动效'],
      en: ['Digital', 'Luxury', 'Motion'],
    },
    ...createMediaPaths('aether-web'),
    ...createImageSet('aether'),
  },
  {
    id: 'atelier-system',
    category: 'branding',
    year: '2023',
    client: { zh: '工坊家居', en: 'Atelier Objects' },
    featured: false,
    title: { zh: '工坊视觉系统', en: 'Atelier System' },
    summary: {
      zh: '为家居品牌建立可延展的视觉框架，让包装、展览与传播物料之间保持一致而自然的联系。',
      en: 'A scalable visual framework for a furniture label, extending coherently from packaging to exhibitions and campaign assets.',
    },
    description: {
      zh: '这套系统在结构感与材质感之间保持平衡，使品牌应用既统一清晰，又不会变得僵硬单一。',
      en: 'The system balances structure and material sensitivity, creating brand applications that feel coherent without becoming rigid.',
    },
    metrics: {
      zh: ['包装系统', '品牌延展', '视觉框架'],
      en: ['Packaging system', 'Brand rollout', 'Visual framework'],
    },
    tags: {
      zh: ['品牌', '零售', '包装'],
      en: ['Branding', 'Retail', 'Packaging'],
    },
    ...createMediaPaths('atelier-system'),
    ...createImageSet('atelier'),
  },
  {
    id: 'solstice-campaign',
    category: 'campaign',
    year: '2024',
    client: { zh: '至点文化空间', en: 'Solstice Culture House' },
    featured: false,
    title: { zh: '至点传播项目', en: 'Solstice Campaign' },
    summary: {
      zh: '覆盖海报、社交媒体素材与发布物料的一组传播视觉方向，建立在对比、节奏与克制之上。',
      en: 'A campaign direction spanning posters, social assets, and launch materials, built on contrast, pacing, and restraint.',
    },
    description: {
      zh: '这套传播语言希望在不同触点上维持一致的视觉张力：明确、集中，但不过度喧哗。',
      en: 'The campaign language is designed to maintain the same visual pressure across touchpoints—present, focused, and never unnecessarily loud.',
    },
    metrics: {
      zh: ['传播方向', '线下物料', '社交素材包'],
      en: ['Campaign direction', 'Out-of-home assets', 'Social toolkit'],
    },
    tags: {
      zh: ['传播', '艺术指导', '社交媒体'],
      en: ['Campaign', 'Art Direction', 'Social'],
    },
    ...createMediaPaths('solstice-campaign'),
    ...createImageSet('solstice'),
  },
  {
    id: 'kinetic-frames',
    category: 'digital',
    year: '2025',
    client: { zh: '画廊预览计划', en: 'Gallery Preview' },
    featured: false,
    title: { zh: '动态框架', en: 'Kinetic Frames' },
    summary: {
      zh: '一项关于顺序、节奏与展示逻辑的概念研究，更像是一场展示实验，而不是常规的发布页面。',
      en: 'A concept study exploring sequencing, pacing, and display logic—closer to a presentation experiment than a conventional launch page.',
    },
    description: {
      zh: '这个研究关注视觉作品如何被呈现：通过更慢的节奏、更大的留白与更轻的动效，把展示本身也变成叙事的一部分。',
      en: 'This study looks at how visual work is presented: testing slower pacing, larger fields of whitespace, and lighter motion as part of the narrative itself.',
    },
    metrics: {
      zh: ['概念研究', '动效实验', '展示系统'],
      en: ['Concept study', 'Motion experiments', 'Presentation system'],
    },
    tags: {
      zh: ['数字', '实验性', '动效'],
      en: ['Digital', 'Experimental', 'Motion'],
    },
    ...createMediaPaths('kinetic-frames'),
    ...createImageSet('kinetic'),
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export const experience = [
  {
    year: '2023',
    title: { zh: '学生', en: 'Student' },
    company: { zh: '苏州工艺美术职业技术学院（苏州工艺美院）', en: 'Suzhou Art & Design Technology Institute' },
    description: {
      zh: '毕业于苏州工艺美术职业技术学院（苏州工艺美院）。',
      en: 'Graduated from Suzhou Art & Design Technology Institute.',
    },
  },
  {
    year: '2024.8 - 2025.3',
    title: { zh: '新媒体实习', en: 'New Media Intern' },
    company: { zh: '苏州大器精密机械有限公司', en: 'Suzhou Daqi Precision Machinery Co., Ltd.' },
    salary: '3k',
    description: {
      zh: '实习经历，主要参与现场直播相关工作。',
      en: 'Internship experience mainly involving livestream support and related new media work.',
    },
  },
  {
    year: '2025.5 - 2026.1',
    title: { zh: '平面设计', en: 'Graphic Designer' },
    company: { zh: '普若林经贸发展（苏州）有限公司', en: 'Puruolin Economic and Trade Development (Suzhou) Co., Ltd.' },
    salary: '5k',
    description: {
      zh: '公司在亚马逊平台运营 Xstrap、Tumax、Prowin 三个品牌产品。本人主要负责 Xstrap 相关设计工作，根据运营需求，完成从产品拍摄、修图，到风格统一的亚马逊主图、副图及 A+ 页面设计。',
      en: 'The company operates Xstrap, Tumax, and Prowin brand products on Amazon. I was mainly responsible for Xstrap design work, completing product photography, image retouching, and consistent Amazon main images, secondary images, and A+ content according to operational requirements.',
    },
  },
]
