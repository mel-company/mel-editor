import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) { }

  resolveStore(host: string): string {
    // Extract subdomain from host or return default
    if (!host) return 'azyaa';

    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }

    return 'azyaa';
  }

  async findAll() {
    return this.prisma.template.findMany();
  }

  async findOne(id: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    return template;
  }

  async findByCategory(category: string) {
    return this.prisma.template.findMany({
      where: { category },
    });
  }

  async create(createTemplateDto: CreateTemplateDto) {
    return this.prisma.template.create({
      data: createTemplateDto,
    });
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    try {
      return await this.prisma.template.update({
        where: { id },
        data: updateTemplateDto,
      });
    } catch (error) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.template.delete({
        where: { id },
      });
      return { message: 'Template deleted successfully' };
    } catch (error) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
  }

  // Legacy endpoint methods
  async getTemplateByStore(host: string) {
    const subdomain = this.resolveStore(host);
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    if (!store || !store.json) {
      // Return mock template if no store data exists
      return {
        id: 'mock-template',
        name: 'Mock Template',
        pages: [
          {
            id: 'home',
            name: 'Home',
            sections: [
              { type: 'hero', data: {} },
              { type: 'products', data: {} },
            ],
          },
        ],
      };
    }

    try {
      const storeData = JSON.parse(store.json);
      return storeData.template || null;
    } catch (e) {
      console.error('Error parsing store data:', e);
      return null;
    }
  }
}
