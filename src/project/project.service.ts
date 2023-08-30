import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createProjectInput: CreateProjectInput) {
    const project = new Project();
    project.name = createProjectInput.name;
    const employees = await this.employeeService.findAllByID(
      createProjectInput.employees,
    );
    project.employees = employees;

    return await this.projectRepository.save(project);
  }

  findAll() {
    return `This action returns all project`;
  }

  async findAllByID(id: number[]): Promise<Project[]> {
    return await this.projectRepository.findBy({ id: In(id) });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectInput: UpdateProjectInput) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
