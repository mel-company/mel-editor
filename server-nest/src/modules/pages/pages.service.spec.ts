import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

describe('PagesService', () => {
  let service: PagesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    page: {
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
        PagesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PagesService>(PagesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all pages', async () => {
      const mockPages = [
        { id: 1, name: 'Home', route: '/', store: '{}', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'About', route: '/about', store: '{}', createdAt: new Date(), updatedAt: new Date() },
      ];

      mockPrismaService.page.findMany.mockResolvedValue(mockPages);

      const result = await service.findAll();

      expect(result).toEqual(mockPages);
      expect(mockPrismaService.page.findMany).toHaveBeenCalled();
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

      mockPrismaService.page.findUnique.mockResolvedValue(mockPage);

      const result = await service.findOne(1);

      expect(result).toEqual(mockPage);
      expect(mockPrismaService.page.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when page is not found', async () => {
      mockPrismaService.page.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow('Page with ID 999 not found');
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

      mockPrismaService.page.create.mockResolvedValue(mockCreatedPage);

      const result = await service.create(createPageDto);

      expect(result).toEqual(mockCreatedPage);
      expect(mockPrismaService.page.create).toHaveBeenCalledWith({
        data: {
          ...createPageDto,
          store: JSON.stringify(createPageDto.store),
        },
      });
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

      mockPrismaService.page.update.mockResolvedValue(mockUpdatedPage);

      const result = await service.update(1, updatePageDto);

      expect(result).toEqual(mockUpdatedPage);
      expect(mockPrismaService.page.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatePageDto,
      });
    });

    it('should update page with store data', async () => {
      const updatePageDto: UpdatePageDto = {
        store: { sections: [{ id: 1, type: 'hero' }] },
      };

      const mockUpdatedPage = {
        id: 1,
        name: 'Home',
        route: '/',
        store: JSON.stringify({ sections: [{ id: 1, type: 'hero' }] }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.page.update.mockResolvedValue(mockUpdatedPage);

      const result = await service.update(1, updatePageDto);

      expect(result).toEqual(mockUpdatedPage);
      expect(mockPrismaService.page.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          store: JSON.stringify(updatePageDto.store),
        },
      });
    });

    it('should throw NotFoundException when updating non-existent page', async () => {
      const updatePageDto: UpdatePageDto = {
        name: 'Updated Page',
      };

      mockPrismaService.page.update.mockRejectedValue(new Error('Record not found'));

      await expect(service.update(999, updatePageDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a page', async () => {
      mockPrismaService.page.delete.mockResolvedValue({
        id: 1,
        name: 'Home',
        route: '/',
        store: '{}',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.remove(1);

      expect(result).toEqual({ message: 'Page deleted successfully' });
      expect(mockPrismaService.page.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when deleting non-existent page', async () => {
      mockPrismaService.page.delete.mockRejectedValue(new Error('Record not found'));

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
