import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ description: 'Store ID', example: 'store-1' })
  storeId: string;

  @ApiPropertyOptional({ description: 'Template ID', example: 'retail-v1' })
  templateId?: string;

  @ApiPropertyOptional({ description: 'Store data as JSON string', example: '{"products":[],"pageTemplates":[]}' })
  json?: string;

  @ApiPropertyOptional({ description: 'Published store data as JSON string' })
  publishedJson?: string;

  @ApiPropertyOptional({ description: 'Store subdomain', example: 'demo' })
  subdomain?: string;
}
