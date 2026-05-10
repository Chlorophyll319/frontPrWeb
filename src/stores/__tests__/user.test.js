import { createPinia, setActivePinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import { useUserStore } from '@/stores/user'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })


  it('初始狀態正確', () => {
    const user = useUserStore()
    expect(user.username).toBe('')
    expect(user.role).toBe('user')
    expect(user.token).toBe('')
    expect(user.isLoggedIn).toBe(false)
    expect(user.isAdmin).toBe(false)
  })

  it('login() 設定使用者資料', () => {
    const user = useUserStore()
    user.login({ username: 'admin', role: 'admin', token: 'abc123' })
    expect(user.username).toBe('admin')
    expect(user.role).toBe('admin')
    expect(user.token).toBe('abc123')
  })

  it('login() 未帶 token 時保持 token 為空', () => {
    const user = useUserStore()
    user.login({ username: 'test', role: 'user' })
    expect(user.token).toBe('')
  })

  it('logout() 重置所有狀態', () => {
    const user = useUserStore()
    user.login({ username: 'admin', role: 'admin', token: 'abc123' })
    user.logout()
    expect(user.username).toBe('')
    expect(user.role).toBe('user')
    expect(user.token).toBe('')
  })

  it('isLoggedIn 在有 token 時為 true', () => {
    const user = useUserStore()
    expect(user.isLoggedIn).toBe(false)
    user.login({ username: 'x', role: 'user', token: 'tok' })
    expect(user.isLoggedIn).toBe(true)
    user.logout()
    expect(user.isLoggedIn).toBe(false)
  })

  it('isAdmin 只在 role 為 admin 時為 true', () => {
    const user = useUserStore()
    user.login({ username: 'x', role: 'admin', token: 'tok' })
    expect(user.isAdmin).toBe(true)
    user.logout()
    user.login({ username: 'x', role: 'user', token: 'tok' })
    expect(user.isAdmin).toBe(false)
  })

  it('持久化 key 為 its-project-user，只保存指定欄位', () => {
    // Pinia v3 的插件需要 app.use(pinia) 才會生效
    const app = createApp({})
    const pinia = createPinia()
    const mockStorage = { getItem: vi.fn(() => null), setItem: vi.fn(), removeItem: vi.fn() }
    pinia.use(createPersistedState({ storage: mockStorage }))
    app.use(pinia)
    setActivePinia(pinia)
    const user = useUserStore()
    user.login({ username: 'test', role: 'admin', token: 'tok123' })
    // $persist() 直接觸發寫入，不依賴 $subscribe watcher
    user.$persist()
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      'its-project-user',
      JSON.stringify({ username: 'test', role: 'admin', token: 'tok123' }),
    )
  })
})
