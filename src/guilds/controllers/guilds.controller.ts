import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { IGuildsService } from '../interfaces/guilds';

@Controller(ROUTES.GUILDS)
export class GuildsController {
  constructor(
    @Inject(SERVICES.GUILDS) private readonly guildsService: IGuildsService,
  ) {}

  @Get(':guildId/config')
  async getGuildConfig(@Param('guildId') guildId: string) {
    const guildConfig = await this.guildsService.getGuildConfig(guildId);
    if (!guildConfig)
      throw new HttpException(
        'Guild configuration was not found',
        HttpStatus.NOT_FOUND,
      );
    return guildConfig;
  }

  @Post(':guildId/config/prefix')
  async updateGuildPrefix(
    @Param('guildId') guildId: string,
    @Body('prefix') prefix: string,
  ) {
    return this.guildsService.updateGuildPrefix(guildId, prefix);
  }

  @Post(':guildId/config/welcome')
  async updateWelcomeChannel(
    @Param('guildId') guildId: string,
    @Body('welcomeChannelId') welcomeChannelId: string,
  ) {
    return this.guildsService.updateWelcomeChannel(guildId, welcomeChannelId);
  }
}
