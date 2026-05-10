import MockAdapter from 'axios-mock-adapter'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useUserStore } from '@/stores/user'
import apiModule from '@/services/api'

const { apiAuth } = apiModule

describe('apiAuth interceptors', () => {
  let mock

  beforeEach(() => {
    setActivePinia(createPinia())
    mock = new MockAdapter(apiAuth)
  })

  afterEach(() => {
    mock.restore()
  })

  describe('request interceptor', () => {
    it('每次請求自動帶上 Authorization Bearer token', async () => {
      const user = useUserStore()
      user.login({ username: 'admin', role: 'admin', token: 'my-token' })
      mock.onGet('/test').reply(200, {})

      await apiAuth.get('/test')

      expect(mock.history.get[0].headers.Authorization).toBe('Bearer my-token')
    })

    it('未登入時帶空 Bearer token', async () => {
      mock.onGet('/test').reply(200, {})

      await apiAuth.get('/test')

      // axios 會 trim 尾部空格，空 token 時結果為 'Bearer'
      expect(mock.history.get[0].headers.Authorization).toBe('Bearer')
    })
  })

  describe('response interceptor', () => {
    it('收到 400 token 已過期時自動 refresh 並重試原請求', async () => {
      const user = useUserStore()
      user.login({ username: 'admin', role: 'admin', token: 'old-token' })

      mock.onGet('/data').replyOnce(400, { message: 'token 已過期' })
      mock.onPatch('/user/refresh').replyOnce(200, { token: 'new-token' })
      mock.onGet('/data').replyOnce(200, { ok: true })

      const response = await apiAuth.get('/data')

      expect(user.token).toBe('new-token')
      expect(response.data).toEqual({ ok: true })
    })

    it('refresh 成功後 retry 帶新 token', async () => {
      const user = useUserStore()
      user.login({ username: 'admin', role: 'admin', token: 'old-token' })

      mock.onGet('/protected').replyOnce(400, { message: 'token 已過期' })
      mock.onPatch('/user/refresh').replyOnce(200, { token: 'new-token' })
      mock.onGet('/protected').replyOnce(200, {})

      await apiAuth.get('/protected')

      // retry 的請求應帶新 token
      const retryRequest = mock.history.get[1]
      expect(retryRequest.headers.Authorization).toBe('Bearer new-token')
    })

    it('refresh 失敗時呼叫 logout，並拋出原始錯誤', async () => {
      const user = useUserStore()
      user.login({ username: 'admin', role: 'admin', token: 'old-token' })

      mock.onGet('/data').replyOnce(400, { message: 'token 已過期' })
      mock.onPatch('/user/refresh').replyOnce(401, { message: 'unauthorized' })

      await expect(apiAuth.get('/data')).rejects.toMatchObject({
        response: { status: 400 },
      })

      expect(user.isLoggedIn).toBe(false)
    })

    it('非 token 過期的 400 錯誤直接拋出，不觸發 refresh', async () => {
      mock.onGet('/data').replyOnce(400, { message: '其他錯誤' })

      await expect(apiAuth.get('/data')).rejects.toMatchObject({
        response: { status: 400, data: { message: '其他錯誤' } },
      })

      // refresh 沒有被呼叫
      expect(mock.history.patch).toHaveLength(0)
    })

    it('/user/refresh 本身的 400 不觸發遞迴 refresh', async () => {
      const user = useUserStore()
      user.login({ username: 'admin', role: 'admin', token: 'old-token' })

      mock.onPatch('/user/refresh').replyOnce(400, { message: 'token 已過期' })

      await expect(apiAuth.patch('/user/refresh')).rejects.toMatchObject({
        response: { status: 400 },
      })

      // 只有一次 refresh 請求，不遞迴
      expect(mock.history.patch).toHaveLength(1)
    })
  })
})
