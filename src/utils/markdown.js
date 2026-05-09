import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'
import 'highlight.js/styles/github.css'

const DOMPURIFY_CONFIG = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: ['style'],
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  langPrefix: 'language-',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs language-${lang}">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch (error) {
        console.error(error)
      }
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
  },
})

// 自訂 fence renderer：以 ```mermaid 語言標記辨識圖表，取代關鍵字比對
const defaultFence = md.renderer.rules.fence
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  if (token.info.trim() === 'mermaid') {
    return `<div class="mermaid">${md.utils.escapeHtml(token.content.trim())}</div>\n`
  }
  return defaultFence
    ? defaultFence(tokens, idx, options, env, self)
    : self.renderToken(tokens, idx, options)
}

let pluginsLoaded = false

async function loadPlugins() {
  if (pluginsLoaded) return

  try {
    const emojiPlugin = await import('markdown-it-emoji')
    const footnotePlugin = await import('markdown-it-footnote')
    const taskListsPlugin = await import('markdown-it-task-lists')
    const tocPlugin = await import('markdown-it-toc-done-right')

    md.use(emojiPlugin.default || emojiPlugin)
    md.use(footnotePlugin.default || footnotePlugin)
    md.use(taskListsPlugin.default || taskListsPlugin, { enabled: true })
    md.use(tocPlugin.default || tocPlugin, {
      containerClass: 'toc',
      listType: 'ul',
      level: [1, 2, 3, 4],
    })

    pluginsLoaded = true
  } catch (error) {
    console.warn('某些 markdown 插件無法載入，將使用基本功能:', error.message)
    pluginsLoaded = true
  }
}

export default {
  async render(markdown) {
    if (!markdown) return ''

    await loadPlugins()
    const html = md.render(markdown)
    return DOMPurify.sanitize(html, DOMPURIFY_CONFIG)
  },
}
