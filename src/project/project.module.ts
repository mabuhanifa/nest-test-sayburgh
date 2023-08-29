import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import EmployeeModule from 'src/employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), EmployeeModule],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
