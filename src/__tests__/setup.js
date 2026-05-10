import { beforeEach, vi } from 'vitest'

class LocalStorageMock {
  constructor() {
    this._store = Object.create(null)
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this._store, key) ? this._store[key] : null
  }
  setItem(key, value) {
    this._store[key] = String(value)
  }
  removeItem(key) {
    delete this._store[key]
  }
  clear() {
    this._store = Object.create(null)
  }
  get length() {
    return Object.keys(this._store).length
  }
  key(i) {
    return Object.keys(this._store)[i] ?? null
  }
}

vi.stubGlobal('localStorage', new LocalStorageMock())

beforeEach(() => {
  localStorage.clear()
})
