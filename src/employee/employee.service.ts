import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeInput: CreateEmployeeInput) {
    const employee = new Employee();
    employee.name = createEmployeeInput.name;
    employee.email = createEmployeeInput.email;
    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find({});
  }

  findOne(id: number) {
    const employee = this.employeeRepository.findOne({
      where: {
        id,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return employee;
  }

  update(id: number, updateEmployeeInput: UpdateEmployeeInput) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
