import { Injectable } from '@nestjs/common';
import { CreateCommunityInput } from './dto/create-community.input';
import { UpdateCommunityInput } from './dto/update-community.input';
import { Community } from './entities/community.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
    private readonly userService: UserService,
  ) {}

  async create(createCommunityInput: CreateCommunityInput) {
    const community = new Community();
    community.name = createCommunityInput.name;
    const users: User[] = await this.userService.findAllByID(
      createCommunityInput.users,
    );
    community.users = users;
    return this.communityRepository.save(community);
  }

  findAll() {
    return `This action returns all community`;
  }

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityInput: UpdateCommunityInput) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
