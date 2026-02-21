# Testing Guide

This guide covers unit testing for the NestJS server using Jest.

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Watch Mode (Auto-rerun on changes)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:cov
```

Coverage report will be generated in `server-nest/coverage/` directory.

## 📁 Test Structure

```
server-nest/src/
├── modules/
│   ├── products/
│   │   ├── products.service.spec.ts
│   │   ├── products.controller.spec.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── pages/
│   │   ├── pages.service.spec.ts
│   │   ├── pages.controller.spec.ts
│   │   ├── pages.service.ts
│   │   └── pages.controller.ts
│   └── storage/
│       ├── storage.service.spec.ts
│       ├── storage.controller.spec.ts
│       ├── storage.service.ts
│       └── storage.controller.ts
└── shared/
    └── services/
        ├── prisma.service.spec.ts
        └── prisma.service.ts
```

## 📝 Test Coverage

### Services
- ✅ **ProductsService**: CRUD operations with Prisma
- ✅ **PagesService**: CRUD operations with Prisma
- ✅ **StorageService**: R2 file upload/delete
- ✅ **PrismaService**: Database connection lifecycle

### Controllers
- ✅ **ProductsController**: HTTP endpoint handlers
- ✅ **PagesController**: HTTP endpoint handlers
- ✅ **StorageController**: File upload/delete endpoints

## 🔧 Writing Tests

### Service Test Example

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../../shared/services/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should find all products', async () => {
    const mockProducts = [{ id: 1, name: 'Test' }];
    mockPrismaService.product.findMany.mockResolvedValue(mockProducts);

    const result = await service.findAll();

    expect(result).toEqual(mockProducts);
  });
});
```

### Controller Test Example

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should return all products', async () => {
    const mockProducts = [{ id: 1, name: 'Test' }];
    mockProductsService.findAll.mockResolvedValue(mockProducts);

    const result = await controller.findAll();

    expect(result).toEqual(mockProducts);
  });
});
```

## 🎯 Test Patterns

### 1. Mocking Prisma Service
```typescript
const mockPrismaService = {
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
```

### 2. Testing Success Cases
```typescript
it('should create a product', async () => {
  const dto = { name: 'Test', price: 100 };
  const expected = { id: 1, ...dto };
  
  mockPrismaService.product.create.mockResolvedValue(expected);
  
  const result = await service.create(dto);
  
  expect(result).toEqual(expected);
  expect(mockPrismaService.product.create).toHaveBeenCalledWith({
    data: dto,
  });
});
```

### 3. Testing Error Cases
```typescript
it('should throw NotFoundException when product not found', async () => {
  mockPrismaService.product.findUnique.mockResolvedValue(null);
  
  await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
});
```

### 4. Testing with Query Parameters
```typescript
it('should filter products by category', async () => {
  const mockProducts = [{ id: 1, category: 'electronics' }];
  mockPrismaService.product.findMany.mockResolvedValue(mockProducts);
  
  const result = await service.findAll('electronics');
  
  expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
    where: { category: 'electronics' },
  });
});
```

## 📊 Coverage Goals

Target coverage metrics:
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## 🐛 Debugging Tests

### Run Specific Test File
```bash
cd server-nest
npx jest products.service.spec.ts
```

### Run Tests Matching Pattern
```bash
cd server-nest
npx jest --testNamePattern="should create"
```

### Verbose Output
```bash
cd server-nest
npx jest --verbose
```

## 🔍 Best Practices

1. **Isolate Tests**: Each test should be independent
2. **Mock External Dependencies**: Always mock Prisma, S3, etc.
3. **Clear Naming**: Use descriptive test names
4. **Test Edge Cases**: Include error scenarios
5. **Clean Up**: Use `afterEach` to clear mocks
6. **Arrange-Act-Assert**: Follow AAA pattern

## 📚 Resources

- [NestJS Testing Documentation](https://docs.nestjs.com/fundamentals/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
