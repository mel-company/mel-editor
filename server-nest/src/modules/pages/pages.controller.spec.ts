import { Test, TestingModule } from '@nestjs/testing';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

describe('PagesController', () => {
  let controller: PagesController;
  let service: PagesService;

  const mockPagesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesController],
      providers: [
        {
          provide: PagesService,
          useValue: mockPagesService,
        },
      ],
    }).compile();

    controller = module.get<PagesController>(PagesController);
    service = module.get<PagesService>(PagesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all pages', async () => {
      const mockPages = [
        { id: 1, name: 'Home', route: '/', store: '{}', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'About', route: '/about', store: '{}', createdAt: new Date(), updatedAt: new Date() },
      ];

      mockPagesService.findAll.mockResolvedValue(mockPages);

      const result = await controller.findAll();

      expect(result).toEqual(mockPages);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a page by id', async () => {
      const mockPage = {
        id: 1,
        name: 'Home',
        route: '/',
        store: '{"sections":[]}',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPagesService.findOne.mockResolvedValue(mockPage);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockPage);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new page', async () => {
      const createPageDto: CreatePageDto = {
        name: 'Contact',
        route: '/contact',
        store: { sections: [] },
      };

      const mockCreatedPage = {
        id: 1,
        name: 'Contact',
        route: '/contact',
        store: JSON.stringify({ sections: [] }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPagesService.create.mockResolvedValue(mockCreatedPage);

      const result = await controller.create(createPageDto);

      expect(result).toEqual(mockCreatedPage);
      expect(service.create).toHaveBeenCalledWith(createPageDto);
    });
  });

  describe('update', () => {
    it('should update a page', async () => {
      const updatePageDto: UpdatePageDto = {
        name: 'Updated Home',
      };

      const mockUpdatedPage = {
        id: 1,
        name: 'Updated Home',
        route: '/',
        store: '{}',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPagesService.update.mockResolvedValue(mockUpdatedPage);

      const result = await controller.update('1', updatePageDto);

      expect(result).toEqual(mockUpdatedPage);
      expect(service.update).toHaveBeenCalledWith(1, updatePageDto);
    });
  });

  describe('remove', () => {
    it('should delete a page', async () => {
      const mockResponse = { message: 'Page deleted successfully' };

      mockPagesService.remove.mockResolvedValue(mockResponse);

      const result = await controller.remove('1');

      expect(result).toEqual(mockResponse);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
