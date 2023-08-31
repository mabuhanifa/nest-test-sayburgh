import {
  ExecutionContext,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { CommunityService } from 'src/community/community.service';
import { Community } from 'src/community/entities/community.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => CommunityService))
    private readonly communityService: CommunityService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = new User();

    const saltOrRounds = 10;

    user.name = createUserInput.name;

    if (createUserInput.communities) {
      const communities: Community[] = await this.communityService.findAllByID(
        createUserInput.communities,
      );

      user.communities = communities;
    }

    const hash = await bcrypt.hash(createUserInput.password, saltOrRounds);

    user.password = hash;

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['communities'] });
  }

  async findAllByID(id: number[]): Promise<User[]> {
    return await this.userRepository.findBy({ id: In(id) });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['communities'],
    });
  }

  async findOneByName(name: string) {
    return await this.userRepository.findOne({
      where: { name },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
