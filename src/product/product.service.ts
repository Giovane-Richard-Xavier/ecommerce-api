import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

type ProductFilters = {
  metadata?: { [key: string]: string };
  order?: string;
  limit?: number;
};

type MetaFilterType = {
  metadata: {
    some: {
      categoryMetadataId: string;
      metadataValueId: {
        in: string[];
      };
    };
  };
};

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    return product;
  }

  async findAllProducts(filters: ProductFilters) {
    let orderBy = {};

    switch (filters.order) {
      case 'views':
      default:
        orderBy = { viewsCount: 'desc' };
        break;
      case 'selling':
        orderBy = { salesCount: 'desc' };
        break;
      case 'price':
        orderBy = { price: 'asc' };
        break;
    }

    // Organize metadata
    let where: any = {};

    if (filters.metadata && typeof filters.metadata === 'object') {
      let metaFilters: MetaFilterType[] = [];

      for (let categoryMetadataId in filters.metadata) {
        const value = filters.metadata[categoryMetadataId];

        if (typeof value !== 'string') continue;
        const valueIds = value
          .split('|')
          .map((v) => v.trim())
          .filter(Boolean);
        if (valueIds.length === 0) continue;

        metaFilters.push({
          metadata: {
            some: {
              categoryMetadataId,
              metadataValueId: { in: valueIds },
            },
          },
        });
      }

      if (metaFilters.length > 0) {
        where.AND = metaFilters;
      }
    }

    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        label: true,
        price: true,
        images: {
          take: 1,
          orderBy: { id: 'asc' },
        },
      },
      where,
      orderBy,
      take: filters.limit ?? undefined,
    });

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
      image: product.images[0]
        ? `media/products/${product.images[0].url}`
        : null,
      images: undefined,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
