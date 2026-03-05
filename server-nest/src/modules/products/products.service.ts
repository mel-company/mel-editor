import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly API_BASE_URL = 'https://api.mel.iq/api/v1';

  resolveStore(host: string): string {
    // Extract subdomain from host or return default
    if (!host) return 'azyaa';

    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }

    return 'azyaa';
  }

  // Fetch products from external API
  async getProductsByStore(host: string) {
    const subdomain = this.resolveStore(host);

    try {
      const response = await fetch(
        `${this.API_BASE_URL}/product/by-store-domain/cursor?store=${subdomain}&limit=100`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch products from API: ${response.status} ${response.statusText}`);
        throw new HttpException(
          `Failed to fetch products: ${response.statusText}`,
          response.status
        );
      }

      const apiData = await response.json();
      const baseUrl = apiData.baseUrl || 'https://pub-f8707810144b47a6978976f94751bbc8.r2.dev';

      // Transform API response to match application's expected structure
      const products = (apiData.data || []).map((product: any) => ({
        id: product.id,
        name: product.title, // API uses 'title', app expects 'name'
        title: product.title,
        image: product.image ? `${baseUrl}/${product.image}` : '',
        price: product.price,
        description: product.description || '',
        variants: (product.variants || []).map((variant: any) => ({
          id: variant.id,
          name: variant.optionValues?.map((ov: any) => ov.label).join(' - ') || '',
          price: variant.price || product.price,
          image: variant.image ? `${baseUrl}/${variant.image}` : product.image ? `${baseUrl}/${product.image}` : '',
        })),
        categories: (product.categories || []).map((cat: any) => ({
          id: cat.category?.id || '',
          name: cat.category?.name || '',
          image: cat.category?.image ? `${baseUrl}/${cat.category.image}` : '',
        })),
      }));

      return products;
    } catch (error) {
      console.error('Error fetching products from external API:', error);
      throw new HttpException(
        'Failed to fetch products from external API',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Fetch categories from external API
  async getCategoriesByStore(host: string) {
    const subdomain = this.resolveStore(host);

    try {
      const response = await fetch(
        `${this.API_BASE_URL}/category/by-store-domain?store=${subdomain}&limit=100`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch categories from API: ${response.status} ${response.statusText}`);
        throw new HttpException(
          `Failed to fetch categories: ${response.statusText}`,
          response.status
        );
      }

      const apiData = await response.json();
      const baseUrl = apiData.baseUrl || 'https://pub-f8707810144b47a6978976f94751bbc8.r2.dev';

      // Transform API response to match application's expected structure
      const categories = (apiData.data || []).map((category: any) => ({
        id: category.id,
        name: category.name,
        thumbnail: {
          url: category.image ? `${baseUrl}/${category.image}` : '',
        },
      }));

      return categories;
    } catch (error) {
      console.error('Error fetching categories from external API:', error);
      throw new HttpException(
        'Failed to fetch categories from external API',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
