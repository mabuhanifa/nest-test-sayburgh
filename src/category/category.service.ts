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
    private contactInfoRepository: Repository<Category>,
  ) {}
  create(createCategoryInput: CreateCategoryInput) {
    const category = new Category();
    category.name = createCategoryInput.name;
    return this.contactInfoRepository.save(category);
  }

  findAll() {
    return this.contactInfoRepository.find({});
  }

  findOne(id: number) {
    return this.contactInfoRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
