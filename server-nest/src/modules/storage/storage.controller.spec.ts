import { Test, TestingModule } from '@nestjs/testing';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

describe('StorageController', () => {
  let controller: StorageController;
  let service: StorageService;

  const mockStorageService = {
    uploadFile: jest.fn(),
    deleteFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageController],
      providers: [
        {
          provide: StorageService,
          useValue: mockStorageService,
        },
      ],
    }).compile();

    controller = module.get<StorageController>(StorageController);
    service = module.get<StorageService>(StorageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file', async () => {
      const mockFile = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
        mimetype: 'image/jpeg',
      } as Express.Multer.File;

      const mockResponse = {
        success: true,
        url: 'https://test.r2.dev/uploads/test.jpg',
        key: 'uploads/test.jpg',
      };

      mockStorageService.uploadFile.mockResolvedValue(mockResponse);

      const result = await controller.uploadFile(mockFile);

      expect(result).toEqual(mockResponse);
      expect(service.uploadFile).toHaveBeenCalledWith(mockFile);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file', async () => {
      const fileKey = 'uploads/test.jpg';
      const mockResponse = {
        success: true,
        message: 'File deleted successfully',
      };

      mockStorageService.deleteFile.mockResolvedValue(mockResponse);

      const result = await controller.deleteFile(fileKey);

      expect(result).toEqual(mockResponse);
      expect(service.deleteFile).toHaveBeenCalledWith(fileKey);
    });
  });
});
