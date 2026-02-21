import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty({ description: 'Page name', example: 'Home' })
  name: string;

  @ApiProperty({ description: 'Page route', example: '/' })
  route: string;

  @ApiProperty({ description: 'Page store data (JSON)', example: { sections: [] } })
  store: any;
}
