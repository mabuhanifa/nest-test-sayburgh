import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-users.input';
import { UpdateUserInput } from './dto/update-users.input';
import { Users } from './entities/users.entity';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Users)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [Users], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => Users, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => Users)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Users)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
