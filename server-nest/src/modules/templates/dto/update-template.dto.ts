import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTemplateDto {
  @ApiPropertyOptional({ description: 'Template category', example: 'ecommerce' })
  category?: string;

  @ApiPropertyOptional({ description: 'Template folder path', example: 'retail-v1' })
  folder?: string;

  @ApiPropertyOptional({ description: 'Template title', example: 'Retail v1' })
  title?: string;

  @ApiPropertyOptional({ description: 'Template description', example: 'A modern retail template' })
  description?: string;

  @ApiPropertyOptional({ description: 'Preview image URL' })
  previewImage?: string;
}
