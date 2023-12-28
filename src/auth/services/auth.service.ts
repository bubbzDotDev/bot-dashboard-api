import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/user/interfaces/user';
import { SERVICES } from 'src/utils/constants';
import { UserDetails } from 'src/utils/types';
import { IAuthService } from '../interfaces/auth';
import { decryptText } from 'src/utils/encrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {}

  async validateUser(details: UserDetails) {
    const user = await this.userService.findUser(details.discordId);
    if (user) {
      const decryptedUser = {} as UserDetails;
      decryptedUser.discordId = user.discordId;
      decryptedUser.accessToken = user.accessToken;
      decryptedUser.refreshToken = await decryptText(user.refreshToken);
      decryptedUser.username = await decryptText(user.username);
      decryptedUser.discriminator = await decryptText(user.discriminator);
      const { ...updatedDetails } = decryptedUser;
      return this.userService.updateUser(user, updatedDetails);
    }
    return this.userService.createUser(details);
  }
}
