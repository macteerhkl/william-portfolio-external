import { readdir, readFile, writeFile } from 'fs/promises'
import { join, extname } from 'path'

const projectsDir = new URL('../public/images/projects', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

async function collectSvgFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectSvgFiles(fullPath)))
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.svg') {
      files.push(fullPath)
    }
  }
  return files
}

function stripSvg(content) {
  // Remove <text ...>...</text> blocks (single-line)
  let result = content.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, '')
  // Remove role="img" attribute
  result = result.replace(/\s+role="img"/g, '')
  // Remove aria-label="..." attribute
  result = result.replace(/\s+aria-label="[^"]*"/g, '')
  // Collapse any blank lines left behind
  result = result.replace(/(\r?\n){3,}/g, '\n\n')
  return result
}

const files = await collectSvgFiles(projectsDir)
let count = 0
for (const file of files) {
  const original = await readFile(file, 'utf8')
  const stripped = stripSvg(original)
  if (stripped !== original) {
    await writeFile(file, stripped, 'utf8')
    console.log(`cleaned: ${file}`)
    count++
  }
}
console.log(`\nDone — ${count} file(s) updated.`)
