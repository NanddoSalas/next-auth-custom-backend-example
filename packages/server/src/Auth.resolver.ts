import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from './types';
import User from './User.entity';

@Resolver()
class AuthResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: Context) {
    return user;
  }
}

export default AuthResolver;
