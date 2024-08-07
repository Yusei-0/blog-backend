import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {

    console.log('Validating user...');	
    console.log('Username:', username);
    console.log('Password:', password);
    

    try {
      const user = await this.usersService.findByUsername(username);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(String(password), String(user.password));
      if(isPasswordValid)
        console.log('Password is valid');
      else console.log('Password is invalid');
      

      if (!isPasswordValid) {
        return null; // Contraseña incorrecta
      }

      return user; // Usuario y contraseña válidos
    } catch (error) {
      // Manejar errores de forma adecuada
      if (error instanceof NotFoundException) {
        // Usuario no encontrado
        console.error('User not found:', error.message);
      } else {
        // Otro tipo de error
        console.error('Error validating user:', error);
      }
      return null;
    }
  }

  async login(user: User) {

    // const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
