import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products when no category is provided', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', description: 'Desc 1', price: 100, category: 'electronics', image: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Product 2', description: 'Desc 2', price: 200, category: 'books', image: null, createdAt: new Date(), updatedAt: new Date() },
      ];

      mockPrismaService.product.findMany.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(result).toEqual(mockProducts);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: undefined,
      });
    });

    it('should return filtered products when category is provided', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', description: 'Desc 1', price: 100, category: 'electronics', image: null, createdAt: new Date(), updatedAt: new Date() },
      ];

      mockPrismaService.product.findMany.mockResolvedValue(mockProducts);

      const result = await service.findAll('electronics');

      expect(result).toEqual(mockProducts);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: { category: 'electronics' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        description: 'Desc 1',
        price: 100,
        category: 'electronics',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);

      const result = await service.findOne(1);

      expect(result).toEqual(mockProduct);
      expect(mockPrismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when product is not found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow('Product with ID 999 not found');
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        description: 'New Description',
        price: 150,
        category: 'electronics',
        image: 'image.jpg',
      };

      const mockCreatedProduct = {
        id: 1,
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.product.create.mockResolvedValue(mockCreatedProduct);

      const result = await service.create(createProductDto);

      expect(result).toEqual(mockCreatedProduct);
      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: createProductDto,
      });
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 200,
      };

      const mockUpdatedProduct = {
        id: 1,
        name: 'Updated Product',
        description: 'Desc',
        price: 200,
        category: 'electronics',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.product.update.mockResolvedValue(mockUpdatedProduct);

      const result = await service.update(1, updateProductDto);

      expect(result).toEqual(mockUpdatedProduct);
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateProductDto,
      });
    });

    it('should throw NotFoundException when updating non-existent product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
      };

      mockPrismaService.product.update.mockRejectedValue(new Error('Record not found'));

      await expect(service.update(999, updateProductDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      mockPrismaService.product.delete.mockResolvedValue({
        id: 1,
        name: 'Product',
        description: 'Desc',
        price: 100,
        category: 'electronics',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.remove(1);

      expect(result).toEqual({ message: 'Product deleted successfully' });
      expect(mockPrismaService.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when deleting non-existent product', async () => {
      mockPrismaService.product.delete.mockRejectedValue(new Error('Record not found'));

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
