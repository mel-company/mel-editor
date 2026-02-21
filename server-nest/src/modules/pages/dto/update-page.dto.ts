import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePageDto {
  @ApiPropertyOptional({ description: 'Page name', example: 'Home' })
  name?: string;

  @ApiPropertyOptional({ description: 'Page route', example: '/' })
  route?: string;

  @ApiPropertyOptional({ description: 'Page store data (JSON)', example: { sections: [] } })
  store?: any;
}
