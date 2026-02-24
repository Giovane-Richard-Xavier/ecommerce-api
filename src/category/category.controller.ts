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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAllCategories(
    @Query('page', new ParseIntPipe()) page = 1,
    @Query('limit', new ParseIntPipe()) limit = 10,
  ) {
    return this.categoryService.findAllCategories({ page, limit });
  }

  @Get(':id')
  findCategoryById(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }

  @Get(':slug/metadata')
  async getCategoryWithMetadata(@Param('slug') slug: string) {
    const category = await this.categoryService.getCategoryBySlug(slug);

    const metadata = await this.categoryService.getCategoryMetadata(
      category.id,
    );

    return { error: null, category, metadata };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
