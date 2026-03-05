import { Injectable } from '@nestjs/common';

@Injectable()
export class StoresService {

  resolveStore(host: string): string {
    // Extract subdomain from host or return default
    if (!host) return 'azyaa';

    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }

    return 'azyaa';
  }

  // Simple in-memory storage for demo purposes
  private storage: Map<string, any> = new Map();

  async getStoreData(key: string, host: string): Promise<any> {
    const subdomain = this.resolveStore(host);
    const storageKey = `${subdomain}:${key}`;
    const data = this.storage.get(storageKey) || null;
    console.log(`🔍 StoresService.getStoreData - key: ${key}, storageKey: ${storageKey}, hasData: ${!!data}`);
    console.log(`📦 Current storage keys:`, Array.from(this.storage.keys()));
    return data;
  }

  async setStoreData(key: string, value: any, host: string): Promise<void> {
    const subdomain = this.resolveStore(host);
    const storageKey = `${subdomain}:${key}`;
    this.storage.set(storageKey, value);
    console.log(`💾 StoresService.setStoreData - key: ${key}, storageKey: ${storageKey}, valueType: ${typeof value}`);
    console.log(`📦 Storage size after set:`, this.storage.size);
    console.log(`📦 All keys:`, Array.from(this.storage.keys()));
  }
}
