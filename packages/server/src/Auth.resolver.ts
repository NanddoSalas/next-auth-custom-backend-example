import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
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
