import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentService.create(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.departmentService.findAll();
  }

  @Query(() => Department, { name: 'department' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentService.update(
      updateDepartmentInput.id,
      updateDepartmentInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  removeDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.remove(id);
  }
}
