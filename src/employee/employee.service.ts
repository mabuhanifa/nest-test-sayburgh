import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { In, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentService } from 'src/department/department.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private departmentService: DepartmentService,
  ) {}

  async create(createEmployeeInput: CreateEmployeeInput) {
    const employee = new Employee();
    employee.name = createEmployeeInput.name;
    employee.email = createEmployeeInput.email;
    const department = await this.departmentService.findOne(
      createEmployeeInput.departmentId,
    );
    employee.department = department;
    return await this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find({});
  }

  async findAllByID(id: number[]): Promise<Employee[]> {
    return await this.employeeRepository.findBy({ id: In(id) });
  }

  findOne(id: number) {
    const employee = this.employeeRepository.findOne({
      where: {
        id,
      },
      relations: ['department'],
    });

    if (!employee) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeInput: UpdateEmployeeInput) {
    const employee = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });

    employee.name = updateEmployeeInput.name;
    employee.email = updateEmployeeInput.email;

    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const removedEmployee = await this.employeeRepository.delete(id);
    if (removedEmployee.affected) {
      return `Employee with id : ${id} removed`;
    } else {
      return `Employee with id : ${id} not found`;
    }
  }
}
