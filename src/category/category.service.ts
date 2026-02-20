import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationParameters } from 'src/types/pagination-parameters';
import { buildPaginationMeta } from 'src/utils/pagination.util';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });

    return category;
  }

  async findAllCategories(parameter: PaginationParameters) {
    const { page, limit, sort = 'desc' } = parameter;

    const currentPage = Math.max(page, 1);
    const itemsPerPage = Math.max(limit, 1);
    const skip = (currentPage - 1) * itemsPerPage;

    const [totalItems, categories] = await this.prisma.$transaction([
      this.prisma.category.count(),
      this.prisma.category.findMany({
        skip,
        take: itemsPerPage,
        orderBy: { createdAt: sort },
      }),
    ]);

    const meta = buildPaginationMeta(
      totalItems,
      currentPage,
      itemsPerPage,
      categories.length,
    );

    return {
      data: categories,
      meta,
    };
  }

  async findCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Not found Category with ID: ${id}`);
    }

    return category;
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.prisma.category.findFirst({
      where: { slug },
    });

    if (!category) {
      throw new NotFoundException(`Not found Category with Slug: ${slug}`);
    }

    return category;
  }

  async getCategoryMetadata(id: string) {
    const metadata = await this.prisma.categoryMetadata.findMany({
      where: { category_id: id },
      select: {
        id: true,
        name: true,
        values: {
          select: { id: true, label: true },
        },
      },
    });

    if (!metadata) {
      throw new NotFoundException(`Not found metadata with ID: ${id}`);
    }

    return metadata;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Not found Category with ID: ${id}`);
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    return updatedCategory;
  }

  remove(id: string) {
    // Remove category only if there are no related products.
    return `This action removes a #${id} category`;
  }
}
