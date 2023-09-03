import { Module, forwardRef } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { DepartmentModule } from 'src/department/department.module';
import { ProjectModule } from 'src/project/project.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    DepartmentModule,
    forwardRef(() => ProjectModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [EmployeeResolver, EmployeeService],
  exports: [EmployeeService],
})
export default class EmployeeModule {}
