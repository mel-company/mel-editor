import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@ApiTags('pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) { }

  @Get()
  @ApiOperation({ summary: 'Find all pages' })
  @ApiResponse({ status: 200, description: 'Pages found successfully' })
  async findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a page by ID' })
  @ApiParam({ name: 'id', description: 'Page ID' })
  @ApiResponse({ status: 200, description: 'Returns the page' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  async findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new page' })
  @ApiResponse({ status: 201, description: 'Page created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a page' })
  @ApiParam({ name: 'id', description: 'Page ID' })
  @ApiResponse({ status: 200, description: 'Page updated successfully' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  async update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a page' })
  @ApiParam({ name: 'id', description: 'Page ID' })
  @ApiResponse({ status: 200, description: 'Page deleted successfully' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  async remove(@Param('id') id: string) {
    return this.pagesService.remove(+id);
  }
}
