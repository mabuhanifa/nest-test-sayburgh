import { ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentInput: CreateDepartmentInput) {
    const department = new Department();
    department.name = createDepartmentInput.name;

    return this.departmentRepository.save(department);
  }

  async findAll() {
    return await this.departmentRepository.find({ relations: ['employees'] });
  }

  async findOne(id: number) {
    return await this.departmentRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
  }

  update(id: number, updateDepartmentInput: UpdateDepartmentInput) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
