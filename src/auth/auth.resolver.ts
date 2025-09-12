import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver('Mutation')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => RegisterInput)
  async signup(@Args('input') input: RegisterInput): Promise<any> {
    return this.authService.signup(input);
  }

  @Mutation('signin')
  async signin(@Args('input') input: LoginInput) {
    return await this.authService.signin(input);
  }
}
