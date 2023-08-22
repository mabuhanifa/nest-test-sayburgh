import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject()
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeInput: CreateEmployeeInput) {
    const employee = new Employee();
    employee.name = createEmployeeInput.name;
    employee.email = createEmployeeInput.email;
    return this.employeeRepository.save(employee);
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeInput: UpdateEmployeeInput) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
