import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { Department } from './entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentModule {}
