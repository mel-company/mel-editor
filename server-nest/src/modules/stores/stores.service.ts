import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.store.findMany();
  }

  async findOne(storeId: string) {
    const store = await this.prisma.store.findUnique({
      where: { storeId },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }

    return store;
  }

  async findBySubdomain(subdomain: string) {
    const store = await this.prisma.store.findUnique({
      where: { subdomain },
    });

    if (!store) {
      throw new NotFoundException(`Store with subdomain ${subdomain} not found`);
    }

    return store;
  }

  async create(createStoreDto: CreateStoreDto) {
    return this.prisma.store.create({
      data: createStoreDto,
    });
  }

  async update(storeId: string, updateStoreDto: UpdateStoreDto) {
    try {
      return await this.prisma.store.update({
        where: { storeId },
        data: updateStoreDto,
      });
    } catch (error) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }
  }

  async remove(storeId: string) {
    try {
      await this.prisma.store.delete({
        where: { storeId },
      });
      return { message: 'Store deleted successfully' };
    } catch (error) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }
  }
}
