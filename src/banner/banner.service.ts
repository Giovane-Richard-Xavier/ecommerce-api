import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationParameters } from 'src/types/pagination-parameters';
import { buildPaginationMeta } from 'src/utils/pagination.util';

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBannerDto: CreateBannerDto) {
    const banner = await this.prisma.banner.create({
      data: createBannerDto,
    });

    return banner;
  }

  async findAllBanner(parameter: PaginationParameters) {
    const { page, limit, sort = 'desc' } = parameter;

    const currentPage = Math.max(page, 1);
    const itemsPerPage = Math.max(limit, 1);
    const skip = (currentPage - 1) * itemsPerPage;

    const [totalItems, banners] = await this.prisma.$transaction([
      this.prisma.banner.count(),
      this.prisma.banner.findMany({
        skip,
        take: itemsPerPage,
        orderBy: { createdAt: sort },
      }),
    ]);

    const meta = buildPaginationMeta(
      totalItems,
      currentPage,
      itemsPerPage,
      banners.length,
    );

    return {
      data: banners.map((banner) => ({
        ...banner,
        img: `media/banners/${banner.img}`,
      })),
      meta,
    };
  }

  async findBannerById(id: string) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });

    if (!banner) {
      throw new NotFoundException(`Not found Banner with ID: ${id}`);
    }

    return {
      ...banner,
      img: `media/banners/${banner.img}`,
    };
  }

  update(id: string, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: string) {
    return `This action removes a #${id} banner`;
  }
}
