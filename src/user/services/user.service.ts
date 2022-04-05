import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from '../interfaces/user';
import { User } from 'src/utils/typeorm/entities/User';
import { Repository } from 'typeorm';
import { UpdateUserDetails, UserDetails } from 'src/utils/types';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  createUser(details: UserDetails) {
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  findUser(discordId: string) {
    return this.userRepository.findOne({ discordId });
  }

  updateUser(user: User, details: UpdateUserDetails) {
    return this.userRepository.save({
      ...user,
      ...details,
    });
  }
}
