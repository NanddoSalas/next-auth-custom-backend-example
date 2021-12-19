import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Context } from './types';
import User from './User.entity';
import { authenticateWithGoogle, createAccesToken } from './utils';

@InputType()
class GoogleAuthInput {
  @Field()
  idToken: string;
}

@ObjectType()
class GoogleAuthPayload {
  @Field({ nullable: true })
  accesToken?: string;
}

@Resolver()
class Auth {
  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: Context) {
    return user;
  }

  @Mutation(() => GoogleAuthPayload)
  async googleAuth(
    @Arg('input') { idToken }: GoogleAuthInput,
  ): Promise<GoogleAuthPayload> {
    const user = await authenticateWithGoogle(idToken);

    if (!user) return {};

    const accesToken = await createAccesToken(user);

    return { accesToken };
  }
}

export default Auth;
