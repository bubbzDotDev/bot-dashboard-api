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
import { WebSocketHandler } from 'src/websocket/socket';
import { IGuildsService } from '../interfaces/guilds';

@Controller(ROUTES.GUILDS)
export class GuildsController {
  constructor(
    @Inject(SERVICES.GUILDS) private readonly guildsService: IGuildsService,
    @Inject(WebSocketHandler) private readonly wsHandler: WebSocketHandler,
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
    const config = await this.guildsService.updateGuildPrefix(guildId, prefix);
    this.wsHandler.guildConfigUpdate(config);
    return config;
  }

  @Post(':guildId/config/welcome')
  async updateWelcomeChannel(
    @Param('guildId') guildId: string,
    @Body('welcomeChannelId') welcomeChannelId: string,
  ) {
    const config = await this.guildsService.updateWelcomeChannel(
      guildId,
      welcomeChannelId,
    );
    this.wsHandler.guildConfigUpdate(config);
    return config;
  }
}
