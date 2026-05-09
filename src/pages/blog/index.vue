<route lang="yaml">
meta:
  title: '部落格'
  login: ''
  admin: false
</route>

<template>
  <div class="min-h-screen bg-linear-to-br from-base-100 to-base-200/30">
    <div class="container mx-auto px-4 py-12 max-w-5xl">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-base-content mb-3">部落格</h1>
        <p class="text-base-content/60">學員心得、課程分享與職訓資訊</p>
      </div>

      <!-- Tag Filter -->
      <div class="flex flex-wrap gap-2 justify-center mb-8">
        <button
          class="btn btn-sm"
          :class="selectedTag === '' ? 'btn-primary' : 'btn-ghost'"
          @click="selectTag('')"
        >
          全部
        </button>
        <button
          v-for="tag in TAGS"
          :key="tag"
          class="btn btn-sm"
          :class="selectedTag === tag ? 'btn-primary' : 'btn-ghost'"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-error text-lg">{{ error }}</p>
        <button class="btn btn-primary mt-4" @click="fetchBlogs">重試</button>
      </div>

      <!-- Empty -->
      <div v-else-if="blogs.length === 0" class="text-center py-20 text-base-content/50">
        <p class="text-lg">目前沒有文章</p>
      </div>

      <!-- Blog List -->
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          v-for="blog in blogs"
          :key="blog._id"
          :to="`/article/${blog._id}`"
          class="card bg-base-100 shadow-md hover:shadow-xl transition-shadow border border-base-300/50"
        >
          <figure v-if="blog.coverImage" class="h-44 overflow-hidden">
            <img :src="blog.coverImage" :alt="blog.title" class="w-full h-full object-cover" />
          </figure>
          <div class="card-body p-5">
            <div class="badge badge-outline badge-sm mb-2">{{ blog.tags }}</div>
            <h2 class="card-title text-base line-clamp-2">{{ blog.title }}</h2>
            <p class="text-base-content/60 text-sm line-clamp-3 mt-1">{{ blog.summary }}</p>
            <div class="text-xs text-base-content/40 mt-3">
              {{ blog.author }} · {{ formatDate(blog.createdAt) }}
            </div>
          </div>
        </router-link>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-12">
        <button
          class="btn btn-sm btn-ghost"
          :disabled="page <= 1"
          @click="goToPage(page - 1)"
        >
          «
        </button>
        <button
          v-for="p in totalPages"
          :key="p"
          class="btn btn-sm"
          :class="p === page ? 'btn-primary' : 'btn-ghost'"
          @click="goToPage(p)"
        >
          {{ p }}
        </button>
        <button
          class="btn btn-sm btn-ghost"
          :disabled="page >= totalPages"
          @click="goToPage(page + 1)"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import blogsService from '@/services/blogs.js'

const TAGS = ['職訓局環境', '甄試相關', '課程相關', '訓練期間相關規則', '職訓相關補助', '學員心得']
const LIMIT = 9

const blogs = ref([])
const loading = ref(true)
const error = ref(null)
const selectedTag = ref('')
const page = ref(1)
const totalPages = ref(1)

const fetchBlogs = async () => {
  try {
    loading.value = true
    error.value = null
    const { data } = await blogsService.get({
      tag: selectedTag.value || undefined,
      page: page.value,
      limit: LIMIT,
    })
    blogs.value = data.blogs
    totalPages.value = data.totalPages
  } catch (err) {
    console.error(err)
    error.value = '載入文章失敗，請稍後再試'
  } finally {
    loading.value = false
  }
}

const selectTag = (tag) => {
  selectedTag.value = tag
  page.value = 1
  fetchBlogs()
}

const goToPage = (p) => {
  page.value = p
  fetchBlogs()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(fetchBlogs)
</script>
