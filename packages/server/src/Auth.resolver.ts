import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from './types';
import User from './User.entity';

@Resolver()
class AuthResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: Context) {
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async unlinkProvider(
    @Arg('provider') provider: string,
    @Ctx() { user }: Context,
  ): Promise<User | null> {
    if (!user) return null;

    const isUnlinkAllowed = user.connectedProviders().length > 1;

    if (!isUnlinkAllowed) return user;

    if (provider === 'google') user.googleId = '';
    if (provider === 'twitter') user.twitterId = '';
    if (provider === 'github') user.githubId = '';

    try {
      await user.save();
    } catch (error) {}

    return user;
  }
}

export default AuthResolver;
