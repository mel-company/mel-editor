import { Injectable } from '@nestjs/common';

@Injectable()
export class StoresService {

  resolveStore(host: string): string {
    // Extract subdomain from host or return default
    if (!host) return 'demo';

    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }

    return 'demo';
  }

  // Simple in-memory storage for demo purposes
  private storage: Map<string, any> = new Map();

  async getStoreData(key: string, host: string): Promise<any> {
    const subdomain = this.resolveStore(host);
    const storageKey = `${subdomain}:${key}`;
    return this.storage.get(storageKey) || null;
  }

  async setStoreData(key: string, value: any, host: string): Promise<void> {
    const subdomain = this.resolveStore(host);
    const storageKey = `${subdomain}:${key}`;
    this.storage.set(storageKey, value);
  }
}
