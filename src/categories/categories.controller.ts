import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const result = await this.categoriesService.createCategory(
        createCategoryDto,
      );
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
