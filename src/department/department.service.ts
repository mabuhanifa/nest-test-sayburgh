import { Injectable } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  /* -------------------------- createDepartment -------------------------- */

  async create(createDepartmentInput: CreateDepartmentInput) {
    const department = new Department();
    department.name = createDepartmentInput.name;

    return this.departmentRepository.save(department);
  }

  /* -------------------------- findAllDepartments -------------------------- */

  async findAll() {
    return await this.departmentRepository.find({ relations: ['employees'] });
  }

  /* -------------------------- find A Department by ID -------------------------- */

  async findOne(id: number) {
    return await this.departmentRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
  }

  /* -------------------------- updateDepartment -------------------------- */

  update(id: number, updateDepartmentInput: UpdateDepartmentInput) {
    return `This action updates a #${id} department`;
  }

  /* -------------------------- remove a Department by ID -------------------------- */

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
