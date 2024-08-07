import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeederService {
  constructor(private readonly usersService: UsersService) {}

  async seed() {
    await this.seedAdminUser();
  }
 
   async seedAdminUser(){
    const admin = await this.usersService.findOneByRole('admin');
    if (!admin) {
      await this.usersService.create('admin', 'admin@example.com', '1234', 'admin');
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
}
