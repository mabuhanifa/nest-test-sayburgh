import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Community {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => User, (user) => user.communities)
  user: User[];
}
