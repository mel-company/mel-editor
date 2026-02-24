import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

  resolveStore(host: string): string {
    // Extract subdomain from host or return default
    if (!host) return 'demo';

    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }

    return 'demo';
  }

  // Legacy endpoint method
  async getProductsByStore(host: string) {
    const subdomain = this.resolveStore(host);

    // Return actual mock data from templates
    const mockProducts = [
      {
        id: "1",
        name: "قميص قطني كلاسيكي",
        price: 150,
        discount: 20,
        stock: 25,
        category: "ملابس",
        description: "قميص قطني عالي الجودة، مريح ومناسب للارتداء اليومي",
        photos: [{
          name: "قميص قطني كلاسيكي",
          url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        }],
        thumbnail: {
          name: "قميص قطني كلاسيكي",
          url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        },
      },
      {
        id: "2",
        name: "حذاء رياضي مريح",
        price: 299,
        discount: 15,
        stock: 18,
        category: "أحذية",
        description: "حذاء رياضي متين ومريح للمشي والجري، مناسب للاستخدام اليومي",
        photos: [{
          name: "حذاء رياضي مريح",
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        }],
        thumbnail: {
          name: "حذاء رياضي مريح",
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        },
      },
      {
        id: "3",
        name: "ساعة ذكية حديثة",
        price: 599,
        discount: 0,
        stock: 12,
        category: "إلكترونيات",
        description: "ساعة ذكية متطورة مع شاشة كبيرة وميزات صحية متعددة",
        photos: [{
          name: "ساعة ذكية حديثة",
          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        }],
        thumbnail: {
          name: "ساعة ذكية حديثة",
          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        },
      }
    ];

    return mockProducts;
  }
}
