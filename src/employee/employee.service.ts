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
    console.log(removedEmployee);
    return `Employee with id : ${id} removed`;
  }
}
