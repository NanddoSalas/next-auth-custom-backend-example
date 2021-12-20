import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  twitterId?: string;

  @Column({ nullable: true })
  githubId?: string;

  @Column({ default: 0 })
  tokenVersion: number;
}

export default User;
