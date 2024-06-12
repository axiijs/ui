import {execSync} from 'child_process'
import fs from 'fs'

const version = process.argv[2]
if (!version) {
  throw new Error('Missing version argument')
}


const gitStatus = execSync('git status ./ --porcelain').toString().trim()
const isClean = gitStatus  === ''
if (!isClean) {
  throw new Error('Working tree is not clean')
}

try {
  // 去除 link
  execSync('npm install')
  execSync('npm run build')
  // 读取 package.json 内容
  const packageJson = import('../package.json')
  const exports = packageJson.exports
  // 从 icons.json 中为每一个 icon 重新生成 exports 字段。
  const newExports = {}
  const icons = import('../icons.json')
  icons.forEach(icon => {
    // 连字符转成驼峰
    const iconName = icon.name.replace(/-([a-z])/g, g => g[1].toUpperCase())
    // 首字母也要大写
    const exportName = iconName.charAt(0).toUpperCase() + iconName.slice(1)
    newExports[`./${exportName}`] = `./dist/${exportName}.mjs`
  })
  // 重新写入 package.json
  packageJson.exports = newExports
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2))

  const newVersion = execSync(`npm version ${version}`)
  execSync('git push')
  execSync(`npm publish ./`)
  console.log(`published version ${newVersion}`)
} catch (e) {
  console.error(e)
  process.exit(1)
}
