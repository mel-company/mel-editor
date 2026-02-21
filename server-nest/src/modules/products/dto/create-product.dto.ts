import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Laptop' })
  name: string;

  @ApiPropertyOptional({ description: 'Product description', example: 'High-performance laptop' })
  description?: string;

  @ApiPropertyOptional({ description: 'Product price', example: 999.99 })
  price?: number;

  @ApiPropertyOptional({ description: 'Product category', example: 'electronics' })
  category?: string;

  @ApiPropertyOptional({ description: 'Product image URL', example: 'https://example.com/image.jpg' })
  image?: string;
}
