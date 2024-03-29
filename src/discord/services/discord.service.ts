import { Inject, Injectable } from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';
import { IDiscordService } from '../interfaces/discord';
import { IDiscordHttpService } from '../interfaces/discord-http';

@Injectable()
export class DiscordService implements IDiscordService {
  constructor(
    @Inject(SERVICES.DISCORD_HTTP)
    private readonly discordHttpService: IDiscordHttpService,
  ) {}

  getBotGuilds() {
    return this.discordHttpService.fetchBotGuilds();
  }

  getUserGuilds(accessToken: string) {
    return this.discordHttpService.fetchUserGuilds(accessToken);
  }

  async getGuilds(accessToken: string) {
    const userGuilds = await this.getUserGuilds(accessToken);
    const botGuilds = await this.getBotGuilds();
    const adminUserGuilds = userGuilds.filter(
      ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8,
    );
    const mutualGuilds = adminUserGuilds.filter((guild) =>
      botGuilds.some((botGuild) => botGuild.id === guild.id),
    );
    const availableGuilds = adminUserGuilds.filter(
      (guild) => !botGuilds.some((botGuild) => botGuild.id === guild.id),
    );
    return {
      mutualGuilds,
      availableGuilds,
    };
  }

  getGuildChannels(guildId: string) {
    return this.discordHttpService.fetchGuildChannels(guildId);
  }
}
