// Singleton storage manager for in-memory data storage
class StorageManager {
  private static instance: StorageManager;
  private storage: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  resolveStore(host: string | undefined): string {
    if (!host) return 'azyaa';
    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }
    return 'azyaa';
  }

  get(key: string, host: string): any {
    const subdomain = this.resolveStore(host);
    const storageKey = `${subdomain}:${key}`;
    const data = this.storage.get(storageKey) || null;
    console.log(`🔍 StorageManager.get - key: ${key}, storageKey: ${storageKey}, hasData: ${!!data}`);
    console.log(`📦 Current storage keys:`, Array.from(this.storage.keys()));
    return data;
  }

  set(key: string, value: any, host: string): void {
    const subdomain = this.resolveStore(host);
    const storageKey = `${subdomain}:${key}`;
    this.storage.set(storageKey, value);
    console.log(`💾 StorageManager.set - key: ${key}, storageKey: ${storageKey}, valueType: ${typeof value}`);
    console.log(`📦 Storage size after set:`, this.storage.size);
    console.log(`📦 All keys:`, Array.from(this.storage.keys()));
  }
}

export const storageManager = StorageManager.getInstance();
