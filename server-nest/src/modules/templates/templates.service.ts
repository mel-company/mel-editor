import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

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
}
