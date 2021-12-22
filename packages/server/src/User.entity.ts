import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  image: string;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  twitterId?: string;

  @Column({ nullable: true })
  githubId?: string;

  @Field(() => [String])
  connectedProviders(): string[] {
    const providers: string[] = [];

    if (this.googleId) providers.push('google');
    if (this.twitterId) providers.push('twitter');
    if (this.githubId) providers.push('github');

    return providers;
  }
}

export default User;
