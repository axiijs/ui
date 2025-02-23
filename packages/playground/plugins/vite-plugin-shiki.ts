import { Plugin } from 'vite'
import * as shiki from 'shiki'

interface ShikiPluginOptions {
  theme?: string
}

export default function vitePluginShiki(options: ShikiPluginOptions = {}): Plugin {
  let highlighter: shiki.Highlighter

  return {
    name: 'vite-plugin-shiki',
    enforce: 'pre',
    
    async buildStart() {
      // 初始化 highlighter
      highlighter = await shiki.createHighlighter({
        themes: [options.theme || 'github-dark'],
        langs: ['tsx']
      })
    },

    async transform(code: string, id: string) {
      // 检查是否包含 ?shiki 查询参数
      if (!id.includes('?shiki')) {
        return null
      }

      // 移除查询参数以获取真实文件路径
      const realPath = id.split('?')[0]
      
      // 只处理 TypeScript 文件
      if (!realPath.endsWith('.ts') && !realPath.endsWith('.tsx')) {
        return null
      }

      // 使用 shiki 进行代码高亮
      const html = highlighter.codeToHtml(code, {
        lang: 'tsx',
        themes: {
          light: options.theme || 'github-dark'
        }
      })

      // 转换为 ES 模块
      return {
        code: `export default ${JSON.stringify(html)};`,
        map: null
      }
    }
  }
} 