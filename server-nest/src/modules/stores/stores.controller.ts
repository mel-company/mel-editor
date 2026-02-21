import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiResponse({ status: 200, description: 'Returns all stores' })
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':storeId')
  @ApiOperation({ summary: 'Get a store by ID' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiResponse({ status: 200, description: 'Returns the store' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  findOne(@Param('storeId') storeId: string) {
    return this.storesService.findOne(storeId);
  }

  @Get('subdomain/:subdomain')
  @ApiOperation({ summary: 'Get a store by subdomain' })
  @ApiParam({ name: 'subdomain', description: 'Store subdomain' })
  @ApiResponse({ status: 200, description: 'Returns the store' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  findBySubdomain(@Param('subdomain') subdomain: string) {
    return this.storesService.findBySubdomain(subdomain);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({ status: 201, description: 'Store created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Put(':storeId')
  @ApiOperation({ summary: 'Update a store' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiResponse({ status: 200, description: 'Store updated successfully' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  update(@Param('storeId') storeId: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(storeId, updateStoreDto);
  }

  @Delete(':storeId')
  @ApiOperation({ summary: 'Delete a store' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiResponse({ status: 200, description: 'Store deleted successfully' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  remove(@Param('storeId') storeId: string) {
    return this.storesService.remove(storeId);
  }
}
