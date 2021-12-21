import jwt from 'jsonwebtoken';
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
import { createAccesToken } from './utils';

@InputType()
class SignInInput {
  @Field()
  signInToken: string;
}

@ObjectType()
class SignInPayload {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  accesToken?: string;
}

@Resolver()
class AuthResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: Context) {
    return user;
  }

  @Mutation(() => SignInPayload)
  async signin(
    @Arg('input')
    { signInToken }: SignInInput,
  ): Promise<SignInPayload> {
    try {
      const { provider, id, name, email, image } = jwt.verify(
        signInToken,
        process.env.SECRET || 'gCtvpTciwl/nPSvvWQrqn+kIXB7A/SpvRXX5CtfJNDI=',
      ) as {
        provider: string;
        id: string;
        name: string;
        email: string;
        image: string;
      };

      const query = User.createQueryBuilder('user');

      if (provider === 'google') {
        query.where('user.googleId = :id', { id });
      }

      if (provider === 'twitter') {
        query.where('user.twitterId= :id', { id });
      }

      if (provider === 'github') {
        query.where('user.githubId= :id', { id });
      }

      const user = await query.getOne();

      if (user) {
        const accesToken = await createAccesToken(user);

        return { accesToken, user };
      }

      const emailAlreadyInUse = await User.findOne({ where: { email } });

      if (emailAlreadyInUse) return {};

      const newUser = User.create({ name, email, image });

      if (provider === 'google') newUser.googleId = id;

      if (provider === 'twitter') newUser.twitterId = id;

      if (provider === 'github') newUser.githubId = id;

      await newUser.save();

      const accesToken = await createAccesToken(newUser);

      return { accesToken, user: newUser };
    } catch (error) {
      console.log(error);
    }

    return {};
  }
}

export default AuthResolver;
