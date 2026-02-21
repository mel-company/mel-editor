import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  const mockS3 = {
    upload: jest.fn().mockReturnValue({
      promise: jest.fn(),
    }),
    deleteObject: jest.fn().mockReturnValue({
      promise: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
    }).compile();

    service = module.get<StorageService>(StorageService);
    
    // Mock the S3 instance
    (service as any).s3 = mockS3;
    (service as any).bucketName = 'test-bucket';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file to R2 and return public URL', async () => {
      const mockFile = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
        mimetype: 'image/jpeg',
      } as Express.Multer.File;

      const mockUploadResult = {
        Location: 'https://test.r2.dev/uploads/test.jpg',
      };

      mockS3.upload().promise.mockResolvedValue(mockUploadResult);
      process.env.R2_PUBLIC_URL = 'https://test.r2.dev';

      const result = await service.uploadFile(mockFile);

      expect(result.success).toBe(true);
      expect(result.url).toContain('https://test.r2.dev/uploads/');
      expect(result.key).toContain('uploads/');
      expect(result.key).toContain('test.jpg');
      expect(mockS3.upload).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Body: mockFile.buffer,
          ContentType: 'image/jpeg',
        })
      );
    });
  });

  describe('deleteFile', () => {
    it('should delete a file from R2', async () => {
      const fileKey = 'uploads/1234567890-test.jpg';

      mockS3.deleteObject().promise.mockResolvedValue({});

      const result = await service.deleteFile(fileKey);

      expect(result.success).toBe(true);
      expect(result.message).toBe('File deleted successfully');
      expect(mockS3.deleteObject).toHaveBeenCalledWith({
        Bucket: 'test-bucket',
        Key: fileKey,
      });
    });
  });
});
