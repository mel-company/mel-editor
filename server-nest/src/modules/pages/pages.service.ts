import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(subdomain: string = 'demo') {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    if (!store || !store.json) {
      return [];
    }

    const storeData = JSON.parse(store.json);
    return storeData.pageTemplates || [];
  }

  async findOne(id: number, subdomain: string = 'demo') {
    const pages = await this.findAll(subdomain);
    const page = pages.find((p: any) => p.id === id);

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    return page;
  }

  async create(createPageDto: CreatePageDto, subdomain: string = 'demo') {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    const storeData = store?.json ? JSON.parse(store.json) : {};
    const pages = storeData.pageTemplates || [];

    const newPage = {
      id: pages.length > 0 ? Math.max(...pages.map((p: any) => p.id)) + 1 : 1,
      ...createPageDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    pages.push(newPage);
    storeData.pageTemplates = pages;

    await this.prisma.store.update({
      where: { subdomain },
      data: { json: JSON.stringify(storeData) },
    });

    return newPage;
  }

  async update(id: number, updatePageDto: UpdatePageDto, subdomain: string = 'demo') {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    if (!store || !store.json) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    const storeData = JSON.parse(store.json);
    const pages = storeData.pageTemplates || [];
    const index = pages.findIndex((p: any) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    pages[index] = {
      ...pages[index],
      ...updatePageDto,
      updatedAt: new Date().toISOString(),
    };

    storeData.pageTemplates = pages;

    await this.prisma.store.update({
      where: { subdomain },
      data: { json: JSON.stringify(storeData) },
    });

    return pages[index];
  }

  async remove(id: number, subdomain: string = 'demo') {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    if (!store || !store.json) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    const storeData = JSON.parse(store.json);
    const pages = storeData.pageTemplates || [];
    const index = pages.findIndex((p: any) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    pages.splice(index, 1);
    storeData.pageTemplates = pages;

    await this.prisma.store.update({
      where: { subdomain },
      data: { json: JSON.stringify(storeData) },
    });

    return { message: 'Page deleted successfully' };
  }
}
