import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', description: 'Desc 1', price: 100, category: 'electronics', image: null, createdAt: new Date(), updatedAt: new Date() },
      ];

      mockProductsService.findAll.mockResolvedValue(mockProducts);

      const result = await controller.findAll();

      expect(result).toEqual(mockProducts);
      expect(service.findAll).toHaveBeenCalledWith(undefined);
    });

    it('should return filtered products by category', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', description: 'Desc 1', price: 100, category: 'electronics', image: null, createdAt: new Date(), updatedAt: new Date() },
      ];

      mockProductsService.findAll.mockResolvedValue(mockProducts);

      const result = await controller.findAll('electronics');

      expect(result).toEqual(mockProducts);
      expect(service.findAll).toHaveBeenCalledWith('electronics');
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

      mockProductsService.findOne.mockResolvedValue(mockProduct);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(service.findOne).toHaveBeenCalledWith(1);
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

      mockProductsService.create.mockResolvedValue(mockCreatedProduct);

      const result = await controller.create(createProductDto);

      expect(result).toEqual(mockCreatedProduct);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
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

      mockProductsService.update.mockResolvedValue(mockUpdatedProduct);

      const result = await controller.update('1', updateProductDto);

      expect(result).toEqual(mockUpdatedProduct);
      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const mockResponse = { message: 'Product deleted successfully' };

      mockProductsService.remove.mockResolvedValue(mockResponse);

      const result = await controller.remove('1');

      expect(result).toEqual(mockResponse);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
