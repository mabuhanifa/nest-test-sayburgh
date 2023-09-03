import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommunityService } from './community.service';
import { Community } from './entities/community.entity';
import { CreateCommunityInput } from './dto/create-community.input';
import { UpdateCommunityInput } from './dto/update-community.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Resolver(() => Community)
export class CommunityResolver {
  constructor(private readonly communityService: CommunityService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Community)
  createCommunity(
    @Args('createCommunityInput') createCommunityInput: CreateCommunityInput,
  ) {
    return this.communityService.create(createCommunityInput);
  }

  @Query(() => [Community], { name: 'communities' })
  findAll() {
    return this.communityService.findAll();
  }

  @Query(() => Community, { name: 'community' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.communityService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Community)
  updateCommunity(
    @Args('updateCommunityInput') updateCommunityInput: UpdateCommunityInput,
  ) {
    return this.communityService.update(
      updateCommunityInput.id,
      updateCommunityInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Community)
  removeCommunity(@Args('id', { type: () => Int }) id: number) {
    return this.communityService.remove(id);
  }
}
