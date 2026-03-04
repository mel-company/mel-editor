/**
 * Shared Template Utilities
 * 
 * This module exports all shared utilities for template development.
 * Import from here to access builders, factories, and helpers.
 * 
 * @example
 * import { TemplateBuilder, SectionFactory, ContentFactory } from '@templates/shared';
 */

// Builders
export { TemplateBuilder } from './builders/template-builder';
export { PageBuilder } from './builders/page-builder';

// Factories
export { SectionFactory } from './factories/section-factory';
export { ContentFactory } from './factories/content-factory';

// Utilities
export { TemplateValidator } from './utils/template-validator';
export { SectionHelpers } from './utils/section-helpers';

// Data
export { fetchProducts } from './data/products';
export { fetchCategories } from './data/categories';
export { fetchProduct } from './data/single-product';
