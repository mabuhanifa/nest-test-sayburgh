import { Module, forwardRef } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { DepartmentModule } from 'src/department/department.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    DepartmentModule,
    forwardRef(() => ProjectModule),
  ],
  providers: [EmployeeResolver, EmployeeService],
  exports: [EmployeeService],
})
export default class EmployeeModule {}
