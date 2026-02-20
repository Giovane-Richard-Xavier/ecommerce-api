import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { getAbsoluteImageUrl } from 'src/utils/get-absolute-image-url';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @Get()
  async findAllBanner(
    @Query('page', new ParseIntPipe()) page = 1,
    @Query('limit', new ParseIntPipe()) limit = 10,
  ) {
    const banners = await this.bannerService.findAllBanner({ page, limit });

    const bannersWithAbsoluteUrl = banners.data.map((banner) => ({
      ...banner,
      img: getAbsoluteImageUrl(banner.img),
    }));

    return {
      error: null,
      data: bannersWithAbsoluteUrl,
      meta: banners.meta,
    };
  }

  @Get(':id')
  async findBannerById(@Param('id') id: string) {
    const banner = await this.bannerService.findBannerById(id);

    const bannersWithAbsoluteUrl = {
      ...banner,
      img: getAbsoluteImageUrl(banner.img),
    };

    return {
      error: null,
      data: bannersWithAbsoluteUrl,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
