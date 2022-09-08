import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from '../interfaces/user';
import { User } from 'src/utils/typeorm/entities/User';
import { Repository } from 'typeorm';
import { UpdateUserDetails, UserDetails } from 'src/utils/types';
import { encryptText } from 'src/utils/encrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(details: UserDetails) {
    const encryptedDetails = {} as UserDetails;
    encryptedDetails.discordId = details.discordId;
    encryptedDetails.accessToken = details.accessToken;
    encryptedDetails.refreshToken = await encryptText(details.refreshToken);
    encryptedDetails.username = await encryptText(details.username);
    encryptedDetails.discriminator = await encryptText(details.discriminator);
    const newUser = this.userRepository.create(encryptedDetails);
    return this.userRepository.save(newUser);
  }

  findUser(discordId: string) {
    return this.userRepository.findOne({ discordId });
  }

  async updateUser(user: User, details: UpdateUserDetails) {
    const encryptedDetails = {} as User;
    encryptedDetails.id = user.id;
    encryptedDetails.discordId = user.discordId;
    encryptedDetails.accessToken = user.accessToken;
    encryptedDetails.refreshToken = await encryptText(user.refreshToken);
    encryptedDetails.username = await encryptText(user.username);
    encryptedDetails.discriminator = await encryptText(user.discriminator);

    const encryptedUpdatedDetails = {} as UpdateUserDetails;
    encryptedUpdatedDetails.accessToken = details.accessToken;
    encryptedUpdatedDetails.refreshToken = await encryptText(
      details.refreshToken,
    );
    encryptedUpdatedDetails.username = await encryptText(details.username);
    encryptedUpdatedDetails.discriminator = await encryptText(
      details.discriminator,
    );

    return this.userRepository.save({
      ...encryptedDetails,
      ...encryptedUpdatedDetails,
    });
  }
}
