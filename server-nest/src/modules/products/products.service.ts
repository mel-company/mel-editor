import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(category?: string, subdomain: string = 'demo') {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    if (!store || !store.json) {
      return [];
    }

    const storeData = JSON.parse(store.json);
    const products = storeData.products || [];

    if (category) {
      return products.filter((p: any) => p.category === category);
    }

    return products;
  }

  async findOne(id: number, subdomain: string = 'demo') {
    const products = await this.findAll(undefined, subdomain);
    const product = products.find((p: any) => p.id === id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto, subdomain: string = 'demo') {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    const storeData = store?.json ? JSON.parse(store.json) : {};
    const products = storeData.products || [];

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1,
      ...createProductDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);
    storeData.products = products;

    await this.prisma.store.update({
      where: { subdomain },
      data: { json: JSON.stringify(storeData) },
    });

    return newProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto, subdomain: string = 'demo') {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    if (!store || !store.json) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const storeData = JSON.parse(store.json);
    const products = storeData.products || [];
    const index = products.findIndex((p: any) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    products[index] = {
      ...products[index],
      ...updateProductDto,
      updatedAt: new Date().toISOString(),
    };

    storeData.products = products;

    await this.prisma.store.update({
      where: { subdomain },
      data: { json: JSON.stringify(storeData) },
    });

    return products[index];
  }

  async remove(id: number, subdomain: string = 'demo') {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    if (!store || !store.json) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const storeData = JSON.parse(store.json);
    const products = storeData.products || [];
    const index = products.findIndex((p: any) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    products.splice(index, 1);
    storeData.products = products;

    await this.prisma.store.update({
      where: { subdomain },
      data: { json: JSON.stringify(storeData) },
    });

    return { message: 'Product deleted successfully' };
  }
}
