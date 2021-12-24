import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AdapterOnly } from './decorators';
import User from './User.entity';

@Resolver()
class AdapterResolver {
  @AdapterOnly()
  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('image') image: string,
  ): Promise<User | null> {
    const user = User.create({ name, email, image });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }

    return user;
  }

  @AdapterOnly()
  @Query(() => User, { nullable: true })
  async getUser(@Arg('id') id: string): Promise<User | undefined> {
    return User.findOne(id);
  }

  @AdapterOnly()
  @Query(() => User, { nullable: true })
  async getUserByEmail(@Arg('email') email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }

  @AdapterOnly()
  @Query(() => User, { nullable: true })
  async getUserByAccount(
    @Arg('providerAccountId') providerAccountId: string,
  ): Promise<User | undefined> {
    return User.findOne({
      where: [
        { googleId: providerAccountId },
        { twitterId: providerAccountId },
        { githubId: providerAccountId },
      ],
    });
  }

  @AdapterOnly()
  @Mutation(() => Boolean)
  async linkAccount(
    @Arg('provider') provider: string,
    @Arg('providerAccountId') providerAccountId: string,
    @Arg('userId') userId: string,
  ): Promise<Boolean> {
    const query = User.createQueryBuilder('user').update();

    if (provider === 'google') query.set({ googleId: providerAccountId });
    if (provider === 'twitter') query.set({ twitterId: providerAccountId });
    if (provider === 'github') query.set({ githubId: providerAccountId });

    query.where('user.id = :id', { id: userId });

    const { affected } = await query.execute();

    if (affected) return true;

    return false;
  }
}

export default AdapterResolver;
