import { Controller, Get, Post, Body, Put, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Request, Response } from 'express';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) { }

  @Get()
  @ApiOperation({ summary: 'Get all templates' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiResponse({ status: 200, description: 'Returns all templates' })
  findAll(@Query('category') category?: string) {
    if (category) {
      return this.templatesService.findByCategory(category);
    }
    return this.templatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a template by ID' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Returns the template' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new template' })
  @ApiResponse({ status: 201, description: 'Template created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template updated successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template deleted successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }

  // Legacy endpoints for compatibility with server API
  @Get('v1/template')
  @ApiOperation({ summary: 'Get template by store (legacy endpoint)' })
  @ApiResponse({ status: 200, description: 'Returns template for the store' })
  async getTemplateByStore(@Req() req: Request, @Res() res: Response) {
    try {
      const host = req.headers.host;
      const template = await this.templatesService.getTemplateByStore(host);
      res.json({ data: template });
    } catch (e) {
      console.error('API Error:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Get('v1/list')
  @ApiOperation({ summary: 'List all templates (legacy endpoint)' })
  @ApiResponse({ status: 200, description: 'Returns all templates' })
  async listTemplates(@Res() res: Response) {
    try {
      const templates = await this.templatesService.findAll();
      res.json({ data: templates });
    } catch (e) {
      console.error('Database Error:', e);
      res.status(500).json({ error: 'Database Error' });
    }
  }
}
