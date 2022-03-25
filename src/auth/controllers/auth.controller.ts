import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ROUTES } from 'src/utils/constants';
import { AuthenticatedGuard, DiscordAuthGuard } from '../utils/Guards';

@Controller(ROUTES.AUTH)
export class AuthController {
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect() {}

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status() {
    return { msg: 'Authenticated' };
  }

  @Post('logout')
  logout() {}
}
