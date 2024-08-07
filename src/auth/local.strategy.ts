import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }


  async serializeUser(user: any, done: CallableFunction) {
    console.log('Serializing user...');
    console.log(user);
    
    

    done(null, user.id.toString()); // Aquí se serializa el usuario, normalmente se usa el ID del usuario
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    console.log('Deserializing user...');
    console.log(userId);
    
    
    // Aquí se busca el usuario en la base de datos utilizando el ID
    const user = await this.usersService.findUserById(parseInt(userId, 10));
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user); // Se pasa el usuario encontrado a través de done
  }
}
