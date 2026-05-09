<route lang="yaml">
meta:
  title: '其他資訊內容'
  # 有沒有登入都能看
  login: ''
  # 不是管理員也能看
  admin: false
</route>

<template>
  <div class="min-h-screen bg-linear-to-br from-base-100 to-base-200/30">
    <!-- Loading State -->
    <div v-if="loading" class="hero min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="loading loading-spinner loading-lg text-primary"></div>
          <p class="text-lg mt-4 text-base-content/70">文章載入中...</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="hero min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="text-6xl mb-4">😵</div>
          <h1 class="text-2xl font-bold text-error mb-4">載入失敗</h1>
          <p class="text-base-content/70 mb-6">{{ error }}</p>
          <button @click="$router.go(-1)" class="btn btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            返回上頁
          </button>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <article v-else-if="article" class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Breadcrumb -->
      <nav class="breadcrumbs text-sm mb-8 opacity-70">
        <ul>
          <li><router-link to="/" class="link link-hover">首頁</router-link></li>
          <li><router-link to="/otherInfo" class="link link-hover">其他資訊</router-link></li>
          <li class="opacity-50">{{ article.title }}</li>
        </ul>
      </nav>

      <!-- Article Header -->
      <header class="mb-8">
        <!-- Cover Image -->
        <div v-if="article.coverImage" class="mb-8">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              :src="article.coverImage"
              :alt="article.title"
              class="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
            ></div>
          </div>
        </div>

        <!-- Title and Meta -->
        <div
          class="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-base-300/50"
        >
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <div class="badge badge-primary badge-outline">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              文章
            </div>
            <div v-if="article.tags" class="badge badge-secondary badge-outline">
              {{ article.tags }}
            </div>
          </div>

          <h1
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6 leading-tight"
          >
            {{ article.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
            <div class="flex items-center gap-2">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-8 h-8">
                  <span class="text-xs">{{ article.author?.[0] || '作' }}</span>
                </div>
              </div>
              <span>{{ article.author || '匿名作者' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{{ formatDate(article.createdAt) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>約 {{ estimatedReadTime }} 分鐘閱讀</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Article Summary -->
      <div v-if="article.summary" class="mb-8">
        <div
          class="bg-linear-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-6 border-l-4 border-primary shadow-lg"
        >
          <div class="flex items-start gap-3">
            <div class="text-primary mt-1">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-primary mb-2">文章摘要</h2>
              <p class="text-base-content/80 leading-relaxed">{{ article.summary }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <div
        class="bg-base-100/60 backdrop-blur-sm rounded-2xl shadow-xl border border-base-300/50 overflow-hidden"
      >
        <div class="article-content max-w-none p-6 md:p-8 lg:p-12" v-html="renderedContent"></div>
      </div>

      <!-- Article Actions -->
      <div class="mt-8 flex flex-wrap gap-4 justify-center">
        <button @click="$router.go(-1)" class="btn btn-outline btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回上頁
        </button>
        <button @click="shareArticle" class="btn btn-outline btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          分享文章
        </button>
        <router-link to="/otherInfo" class="btn btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          更多文章
        </router-link>
      </div>
    </article>

    <!-- Not Found State -->
    <div v-else class="hero min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="text-6xl mb-4">🔍</div>
          <h1 class="text-2xl font-bold text-base-content mb-4">找不到此文章</h1>
          <p class="text-base-content/70 mb-6">您要查看的文章可能已被移除或不存在</p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button @click="$router.go(-1)" class="btn btn-outline">返回上頁</button>
            <router-link to="/otherInfo" class="btn btn-primary">瀏覽其他文章</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'

let mermaidInstance = null
import { useRoute } from 'vue-router'
import blogs from '@/services/blogs.js'
import markdownUtil from '@/utils/markdown.js'

const route = useRoute()
const article = ref(null)
const loading = ref(true)
const error = ref(null)
const renderedContent = ref('')

const fetchArticle = async () => {
  try {
    loading.value = true
    error.value = null

    const { id } = route.params
    const response = await blogs.getId(id)

    if (response.data.success) {
      article.value = response.data.blogs
      renderedContent.value = await markdownUtil.render(article.value.content || '')
    } else {
      error.value = response.data.message || '獲取文章失敗'
    }
  } catch (err) {
    console.error('獲取文章時發生錯誤:', err)
    error.value = '載入文章時發生錯誤，請稍後再試'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 估算閱讀時間
const estimatedReadTime = computed(() => {
  if (!article.value?.content) return 0
  // 中文字符按照每分鐘300字計算，英文按照每分鐘200字計算
  const chineseChars = (article.value.content.match(/[\u4e00-\u9fff]/g) || []).length
  const englishWords = (article.value.content.match(/[a-zA-Z]+/g) || []).length
  const totalMinutes = Math.ceil(chineseChars / 300 + englishWords / 200)
  return Math.max(1, totalMinutes)
})

// 分享文章功能
const shareArticle = async () => {
  if (navigator.share && article.value) {
    try {
      await navigator.share({
        title: article.value.title,
        text: article.value.summary || '來看看這篇文章',
        url: window.location.href,
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyToClipboard()
      }
    }
  } else {
    copyToClipboard()
  }
}

// 複製到剪貼板
const copyToClipboard = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      // 可以添加 toast 通知
    })
    .catch(() => {
      // 降級方案
      const textArea = document.createElement('textarea')
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    })
}

// 初始化 Mermaid 和 MathJax
const initializeExtraFeatures = async () => {
  try {
    // 動態載入 Mermaid
    const mermaidModule = await import('mermaid').catch(() => null)
    if (mermaidModule?.default) {
      mermaidModule.default.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'strict',
        themeVariables: {
          primaryColor: '#e1f5fe',
          primaryTextColor: '#000000',
          primaryBorderColor: '#1976d2',
          lineColor: '#1976d2',
          secondaryColor: '#f3e5f5',
          tertiaryColor: '#e8f5e8',
          background: '#ffffff',
          mainBkg: '#e1f5fe',
          secondBkg: '#f3e5f5',
          tertiaryBkg: '#e8f5e8',
          edgeLabelBackground: '#ffffff',
          nodeTextColor: '#000000',
          sectionBkgColor: '#f5f5f5',
          altSectionBkgColor: '#eeeeee',
          gridColor: '#cccccc',
          cScale0: '#1976d2',
          cScale1: '#42a5f5',
          cScale2: '#9c27b0',
        },
        flowchart: {
          htmlLabels: false,
          useMaxWidth: true,
          curve: 'basis',
        },
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 10,
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35,
          mirrorActors: true,
          bottomMarginAdj: 1,
          useMaxWidth: true,
        },
        gantt: {
          useMaxWidth: true,
        },
      })

      // 儲存 mermaid 實例供後續使用
      mermaidInstance = mermaidModule.default
    } else {
      console.warn('Mermaid 載入失敗')
    }

    // 動態載入 MathJax - 使用 CDN 方式
    if (!window.MathJax) {
      window.MathJax = {
        tex: {
          inlineMath: [
            ['$', '$'],
            ['\\(', '\\)'],
          ],
          displayMath: [
            ['$$', '$$'],
            ['\\[', '\\]'],
          ],
        },
        svg: {
          fontCache: 'global',
        },
      }

      // 動態插入 MathJax CDN script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
      document.head.appendChild(script)

      // 等待 MathJax 載入完成
      await new Promise((resolve) => {
        script.onload = resolve
        script.onerror = () => {
          console.warn('MathJax 載入失敗')
          resolve()
        }
      })
    }
  } catch (error) {
    console.warn('額外功能載入失敗:', error)
  }
}

// 重新渲染 Mermaid 圖表
const renderMermaidCharts = async () => {
  if (mermaidInstance) {
    try {
      // 等待下一個 tick 確保 DOM 已更新
      await nextTick()

      // 找到所有 mermaid 圖表元素
      const mermaidElements = document.querySelectorAll('.article-content .mermaid')

      for (let i = 0; i < mermaidElements.length; i++) {
        const element = mermaidElements[i]
        const graphDefinition = element.textContent || element.innerText

        if (graphDefinition.trim()) {
          try {
            // 清空元素內容
            element.innerHTML = ''

            const uniqueId = `mermaid-${i}-${Date.now()}`

            // 使用新的渲染方式
            const { svg } = await mermaidInstance.render(uniqueId, graphDefinition.trim())

            // 設置 SVG 內容
            element.innerHTML = svg

            // 確保文字可見並修復跑版
            const svgElement = element.querySelector('svg')
            if (svgElement) {
              // 修復 SVG 尺寸問題
              svgElement.style.maxWidth = '100%'
              svgElement.style.height = 'auto'
              svgElement.style.width = '100%'
              svgElement.style.display = 'block'
              svgElement.removeAttribute('width')
              svgElement.removeAttribute('height')

              // 設定字體
              svgElement.style.fontFamily = 'Arial, sans-serif'
              svgElement.style.fontSize = '14px'

              // 確保所有文字元素可見
              const textElements = svgElement.querySelectorAll('text, .label, foreignObject div')
              textElements.forEach((textEl) => {
                textEl.style.fill = '#000000'
                textEl.style.fontSize = '14px'
                textEl.style.fontFamily = 'Arial, sans-serif'
                textEl.style.color = '#000000'
              })

              // 設定 viewBox 以確保響應式
              try {
                if (!svgElement.getAttribute('viewBox')) {
                  const bbox = svgElement.getBBox()
                  if (bbox && bbox.width && bbox.height) {
                    // 添加一些 padding 避免邊緣被裁切
                    const padding = 10
                    const viewBoxWidth = bbox.width + padding * 2
                    const viewBoxHeight = bbox.height + padding * 2
                    svgElement.setAttribute(
                      'viewBox',
                      `${bbox.x - padding} ${bbox.y - padding} ${viewBoxWidth} ${viewBoxHeight}`,
                    )
                  }
                }
              } catch (e) {
                console.warn('ViewBox calculation failed:', e)
              }
            }
          } catch (renderError) {
            console.error('Mermaid render error:', renderError)
            const errDiv = document.createElement('div')
            errDiv.className = 'mermaid-error'
            errDiv.textContent = `圖表渲染失敗: ${renderError.message}`
            element.replaceChildren(errDiv)
          }
        }
      }
    } catch (error) {
      console.warn('Mermaid rendering failed:', error)
    }
  }
}

// 重新渲染 MathJax 公式
const renderMathJax = async () => {
  if (typeof window !== 'undefined' && window.MathJax) {
    try {
      await nextTick()
      await window.MathJax.typesetPromise()
    } catch (error) {
      console.warn('MathJax 渲染失敗:', error)
    }
  }
}

onMounted(async () => {
  await initializeExtraFeatures()
  await fetchArticle()
  await renderMermaidCharts()
  await renderMathJax()
})

watch(article, async (newArticle) => {
  if (newArticle?.content) {
    renderedContent.value = await markdownUtil.render(newArticle.content)
    await nextTick()
    await renderMermaidCharts()
    await renderMathJax()
  }
})
</script>

<style scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading,
.error,
.not-found {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
}

.article {
  line-height: 1.6;
}

.article-header {
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.article-title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
}

.article-meta {
  color: #666;
  font-size: 14px;
}

.article-meta span {
  margin-right: 20px;
}

.cover-image {
  margin: 30px 0;
  text-align: center;
}

.cover-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.article-summary {
  background: #f8f9fa;
  padding: 20px;
  border-left: 4px solid #007bff;
  margin: 30px 0;
  font-style: italic;
}

.article-content {
  font-size: 16px;
  color: #333;
}

.article-content :deep(h2) {
  margin-top: 40px;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.article-content :deep(h3) {
  margin-top: 30px;
  margin-bottom: 15px;
  color: #34495e;
}

.article-content :deep(p) {
  margin-bottom: 16px;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 4px;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 20px;
  margin: 20px 0;
  font-style: italic;
  color: #666;
}

.article-content :deep(code) {
  background: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.article-content :deep(pre) {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 20px 0;
}

/* Markdown 額外樣式 */
.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 16px 0;
  padding-left: 30px;
}

.article-content :deep(li) {
  margin-bottom: 8px;
}

.article-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  border: 1px solid #ddd;
}

.article-content :deep(th),
.article-content :deep(td) {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.article-content :deep(th) {
  background-color: #f5f5f5;
  font-weight: bold;
}

.article-content :deep(tr:nth-child(even)) {
  background-color: #f9f9f9;
}

/* 強調文字樣式 */
.article-content :deep(strong),
.article-content :deep(b),
.article-content :deep(h1 strong),
.article-content :deep(h1 b),
.article-content :deep(h2 strong),
.article-content :deep(h2 b),
.article-content :deep(h3 strong),
.article-content :deep(h3 b),
.article-content :deep(h4 strong),
.article-content :deep(h4 b),
.article-content :deep(p strong),
.article-content :deep(p b),
.article-content :deep(li strong),
.article-content :deep(li b) {
  font-weight: 700 !important;
}

.article-content :deep(em),
.article-content :deep(i),
.article-content :deep(h1 em),
.article-content :deep(h1 i),
.article-content :deep(h2 em),
.article-content :deep(h2 i),
.article-content :deep(h3 em),
.article-content :deep(h3 i),
.article-content :deep(h4 em),
.article-content :deep(h4 i),
.article-content :deep(p em),
.article-content :deep(p i),
.article-content :deep(li em),
.article-content :deep(li i) {
  font-style: italic !important;
}

.article-content :deep(u) {
  text-decoration: underline !important;
}

.article-content :deep(s),
.article-content :deep(strike),
.article-content :deep(del) {
  text-decoration: line-through !important;
}

.article-content :deep(mark) {
  background-color: #ffff00 !important;
  color: #000000 !important;
  padding: 0.125em 0.25em !important;
}

.article-content :deep(small) {
  font-size: 0.875em !important;
}

.article-content :deep(sub) {
  font-size: 0.75em !important;
  line-height: 0 !important;
  position: relative !important;
  vertical-align: baseline !important;
  bottom: -0.25em !important;
}

.article-content :deep(sup) {
  font-size: 0.75em !important;
  line-height: 0 !important;
  position: relative !important;
  vertical-align: baseline !important;
  top: -0.5em !important;
}

/* 連結樣式 */
.article-content :deep(a) {
  color: #007bff;
  text-decoration: underline;
}

.article-content :deep(a):hover {
  color: #0056b3;
}

/* 任務列表樣式 */
.article-content :deep(.task-list-item) {
  list-style: none;
  position: relative;
}

.article-content :deep(.task-list-item input[type='checkbox']) {
  margin-right: 8px;
  position: relative;
  top: 2px;
}

.article-content :deep(.task-list-item input[type='checkbox']:checked + *) {
  text-decoration: line-through;
  opacity: 0.7;
}

/* 腳註樣式 */
.article-content :deep(.footnote-ref) {
  color: #007bff !important;
  text-decoration: none !important;
  font-size: 0.8em !important;
  vertical-align: super !important;
}

.article-content :deep(.footnote-ref):hover {
  text-decoration: underline !important;
}

.article-content :deep(.footnotes) {
  border-top: 1px solid #eee !important;
  margin-top: 40px !important;
  padding-top: 20px !important;
  font-size: 14px !important;
  color: #666 !important;
}

.article-content :deep(.footnotes-sep) {
  border: none !important;
  border-top: 1px solid #ddd !important;
  margin: 20px 0 !important;
}

.article-content :deep(.footnote-backref) {
  color: #007bff !important;
  text-decoration: none !important;
  margin-left: 8px !important;
}

.article-content :deep(.footnotes ol) {
  list-style-type: decimal !important;
  padding-left: 1.5em !important;
}

.article-content :deep(.footnotes li) {
  margin-bottom: 0.5em !important;
}

/* Emoji 樣式 */
.article-content :deep(.emoji) {
  height: 1.2em;
  width: 1.2em;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}

/* Mermaid 圖表樣式 */
.article-content :deep(.mermaid) {
  text-align: center !important;
  margin: 20px auto !important;
  background: #ffffff !important;
  padding: 15px !important;
  border-radius: 8px !important;
  border: 1px solid #e9ecef !important;
  overflow: visible !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}
.article-content :deep(.mermaid p) {
  margin: 0 !important;
}

.article-content :deep(.mermaid svg) {
  max-width: 100% !important;
  width: auto !important;
  max-height: 400px !important;
  height: auto !important;
  display: block !important;
  margin: 0 auto !important;
  font-family: 'Arial', 'Helvetica', sans-serif !important;
}

.article-content :deep(.mermaid .label) {
  color: #000000 !important;
  font-weight: 500 !important;
}

.article-content :deep(.mermaid .node rect),
.article-content :deep(.mermaid .node circle),
.article-content :deep(.mermaid .node ellipse),
.article-content :deep(.mermaid .node polygon) {
  stroke-width: 2px !important;
}

.article-content :deep(.mermaid .flowchart-link) {
  stroke: #1976d2 !important;
  stroke-width: 2px !important;
}

.article-content :deep(.mermaid .edgePath .path) {
  stroke: #000000 !important;
  stroke-width: 1px !important;
}

.article-content :deep(.mermaid .edgeLabel) {
  background-color: #ffffff !important;
  color: #000000 !important;
}

.article-content :deep(.mermaid text) {
  fill: #000000 !important;
  font-size: 14px !important;
  font-family: 'Arial', 'Helvetica', sans-serif !important;
}

.article-content :deep(.mermaid-error) {
  color: #dc3545 !important;
  background: #f8d7da !important;
  border: 1px solid #f5c6cb !important;
  padding: 10px !important;
  border-radius: 4px !important;
  font-size: 14px !important;
}

/* MathJax 數學公式樣式 */
.article-content :deep(.MathJax) {
  outline: none;
}

.article-content :deep(.MathJax_Display) {
  text-align: center;
  margin: 1em 0;
}

/* 強制 prose 樣式生效 */
.article-content :deep(h1) {
  font-size: 2.25em !important;
  font-weight: 800 !important;
  margin-top: 0 !important;
  margin-bottom: 0.8888889em !important;
  line-height: 1.1111111 !important;
}

.article-content :deep(h2) {
  font-size: 1.875em !important;
  font-weight: 700 !important;
  margin-top: 2em !important;
  margin-bottom: 1em !important;
  line-height: 1.3333333 !important;
}

.article-content :deep(h3) {
  font-size: 1.5em !important;
  font-weight: 600 !important;
  margin-top: 1.6em !important;
  margin-bottom: 0.6em !important;
  line-height: 1.6 !important;
}

.article-content :deep(h4) {
  font-size: 1.25em !important;
  font-weight: 500 !important;
  margin-top: 1.5em !important;
  margin-bottom: 0.5em !important;
}

.article-content :deep(p) {
  margin-top: 1.25em !important;
  margin-bottom: 1.25em !important;
}

.article-content :deep(ul) {
  list-style-type: disc !important;
  margin-top: 1.25em !important;
  margin-bottom: 1.25em !important;
  padding-left: 1.625em !important;
  list-style-position: outside !important;
}

.article-content :deep(ol) {
  list-style-type: decimal !important;
  margin-top: 1.25em !important;
  margin-bottom: 1.25em !important;
  padding-left: 1.625em !important;
  list-style-position: outside !important;
}

.article-content :deep(li) {
  margin-top: 0.5em !important;
  margin-bottom: 0.5em !important;
  line-height: 1.75 !important;
  padding-left: 0.375em !important;
}

/* 代碼高亮增強樣式 */
.article-content :deep(.hljs) {
  background: #f8f8f8 !important;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-family: 'Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.45;
  overflow-x: auto;
}

.article-content :deep(.hljs.language-javascript) {
  border-left: 4px solid #f7df1e;
}

.article-content :deep(.hljs.language-python) {
  border-left: 4px solid #3776ab;
}

.article-content :deep(.hljs.language-css) {
  border-left: 4px solid #1572b6;
}

.article-content :deep(.hljs.language-html) {
  border-left: 4px solid #e34f26;
}

.article-content :deep(.hljs.language-json) {
  border-left: 4px solid #000000;
}

/* 引用區塊增強 */
.article-content :deep(blockquote) {
  border-left: 4px solid #dfe2e5;
  padding: 0 16px;
  color: #6a737d;
  background: #f6f8fa;
  margin: 20px 0;
  border-radius: 0 6px 6px 0;
}

.article-content :deep(blockquote p) {
  margin: 16px 0;
}

.article-content :deep(blockquote p:first-child) {
  margin-top: 0;
}

.article-content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .article-container {
    padding: 15px;
  }

  .article-title {
    font-size: 2em;
  }

  .article-meta span {
    display: block;
    margin-right: 0;
    margin-bottom: 5px;
  }
}
</style>
