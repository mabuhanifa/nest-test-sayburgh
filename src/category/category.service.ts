import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createCategoryInput: CreateCategoryInput) {
    const category = new Category();
    category.name = createCategoryInput.name;
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({});
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    category.name = updateCategoryInput.name;
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const removedCategory = await this.categoryRepository.delete(id);
    if (removedCategory.affected) {
      return `Category with id : ${id} removed`;
    } else {
      return `Category with id : ${id} not found`;
    }
  }
}
