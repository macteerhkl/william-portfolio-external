import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const projectsDir = path.join(root, 'public', 'images', 'projects')

const projectConfigs = [
  {
    id: 'lumiere',
    palette: ['#f6f2ea', '#d9d1c6'],
    accent: '#ffffff',
    text: '#111111',
    label: 'Lumière',
  },
  {
    id: 'noir',
    palette: ['#dedede', '#1a1a1a'],
    accent: '#ffffff',
    text: '#ffffff',
    label: 'Noir Notes',
  },
  {
    id: 'aether',
    palette: ['#0d1328', '#3b4266'],
    accent: '#5b6cff',
    text: '#ffffff',
    label: 'Aether',
  },
  {
    id: 'atelier',
    palette: ['#ece4d8', '#cfbeaa'],
    accent: '#fff8ef',
    text: '#111111',
    label: 'Atelier',
  },
  {
    id: 'solstice',
    palette: ['#111111', '#2d2d2d'],
    accent: '#c9a96e',
    text: '#ffffff',
    label: 'Solstice',
  },
  {
    id: 'kinetic',
    palette: ['#edf0ff', '#cfd5f8'],
    accent: '#5b6cff',
    text: '#111111',
    label: 'Kinetic Frames',
  },
]

const files = [
  { name: 'thumb.svg', width: 1200, height: 1500, variant: 'portrait' },
  { name: 'hires.svg', width: 1600, height: 1200, variant: 'landscape' },
  { name: 'detail-1.svg', width: 1600, height: 1200, variant: 'detailOne' },
  { name: 'detail-2.svg', width: 1600, height: 1200, variant: 'detailTwo' },
  { name: 'detail-1-thumb.svg', width: 1200, height: 900, variant: 'thumbDetail' },
  { name: 'detail-2-thumb.svg', width: 1200, height: 900, variant: 'thumbDetail' },
]

const createSvg = ({ width, height, variant }, config) => {
  const [start, end] = config.palette
  const isDark = config.text === '#ffffff'
  const overlay = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.38)'
  const textOpacity = isDark ? 0.9 : 0.82
  const label =
    variant === 'detailOne'
      ? `${config.label} / Editorial Frame`
      : variant === 'detailTwo'
        ? `${config.label} / Presentation View`
        : config.label

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${start}"/>
      <stop offset="100%" stop-color="${end}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <circle cx="${Math.round(width * 0.74)}" cy="${Math.round(height * 0.25)}" r="${Math.round(Math.min(width, height) * 0.16)}" fill="${config.accent}" fill-opacity="0.34"/>
  <rect x="${Math.round(width * 0.14)}" y="${Math.round(height * 0.18)}" width="${Math.round(width * 0.72)}" height="${Math.round(height * 0.54)}" rx="${Math.round(Math.min(width, height) * 0.025)}" fill="${overlay}"/>
  <rect x="${Math.round(width * 0.14)}" y="${Math.round(height * 0.78)}" width="${Math.round(width * 0.26)}" height="${Math.max(4, Math.round(height * 0.004))}" fill="${config.text}" fill-opacity="0.68"/>
  <rect x="${Math.round(width * 0.14)}" y="${Math.round(height * 0.82)}" width="${Math.round(width * 0.16)}" height="${Math.max(3, Math.round(height * 0.003))}" fill="${config.text}" fill-opacity="0.34"/>
  <text x="${Math.round(width * 0.14)}" y="${Math.round(height * 0.74)}" fill="${config.text}" fill-opacity="${textOpacity}" font-size="${Math.round(Math.min(width, height) * 0.06)}" font-family="Arial, Helvetica, sans-serif">${label}</text>
</svg>
`
}

for (const config of projectConfigs) {
  const projectPath = path.join(projectsDir, config.id)
  await mkdir(projectPath, { recursive: true })

  for (const file of files) {
    const outputPath = path.join(projectPath, file.name)
    await writeFile(outputPath, createSvg(file, config), 'utf8')
  }
}

console.log(`Generated ${projectConfigs.length * files.length} placeholder SVG files.`)
