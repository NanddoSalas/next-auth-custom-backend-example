import faker from 'faker';
import {
  Args,
  ArgsType,
  Field,
  ID,
  Int,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

@ObjectType()
class Post {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  createdAt: string;

  @Field()
  author: string;

  @Field()
  avatar: string;
}

@ArgsType()
class PostsArgs {
  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => Int, { nullable: true })
  cursor: number;
}

@Resolver()
class PostResolver {
  @Query(() => [Post])
  posts(@Args() { limit, cursor }: PostsArgs): Post[] {
    const posts: Post[] = [];

    for (let i = 1; i <= limit; i++) {
      const seed = cursor ? cursor + i : i;

      faker.seed(seed);

      posts.push({
        id: i,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        createdAt: faker.date.past().toISOString(),
        author: faker.internet.userName(),
        avatar: faker.internet.avatar(),
      });
    }

    return posts;
  }
}

export default PostResolver;
