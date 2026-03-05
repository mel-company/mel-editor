export function resolveStore(host: string): string {
  // Extract subdomain from host or return default
  if (!host) return 'azyaa';

  const parts = host.split('.');
  if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
    return parts[0];
  }

  return 'azyaa';
}

export function getMockData(storeId: string) {
  // Mock data for development - this would be replaced with actual template loading
  return {
    mockProducts: [
      { id: 1, name: 'Product 1', price: 29.99, category: 'electronics' },
      { id: 2, name: 'Product 2', price: 19.99, category: 'clothing' },
      { id: 3, name: 'Product 3', price: 49.99, category: 'books' },
    ],
    mockCategories: [
      { id: 1, name: 'Electronics', slug: 'electronics' },
      { id: 2, name: 'Clothing', slug: 'clothing' },
      { id: 3, name: 'Books', slug: 'books' },
    ],
    mockTemplate: {
      id: 'mock-template',
      name: 'Mock Template',
      pages: [
        {
          id: 'home',
          name: 'Home',
          sections: [
            { type: 'hero', data: {} },
            { type: 'products', data: {} },
          ],
        },
      ],
    },
  };
}
