import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'community' })
@ObjectType({ description: 'This is community Object Type' })
export class Community {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => User, (user) => user.communities)
  @JoinTable()
  @Field(() => [User])
  user: User[];
}
