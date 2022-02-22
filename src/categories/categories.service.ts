import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  getAllCategories() {
    return this.categoriesRepository.find({});
  }

  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }
}
