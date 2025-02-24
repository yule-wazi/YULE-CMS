enum CachType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CachType) {
    this.storage = type === CachType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if(value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CachType.Local)
const sessionCache = new Cache(CachType.Session)

export {localCache, sessionCache}
