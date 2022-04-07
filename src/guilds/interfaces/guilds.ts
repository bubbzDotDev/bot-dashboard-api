import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';

export interface IGuildsService {
  getGuildConfig(guildId: string): Promise<GuildConfiguration>;
  updateGuildPrefix(
    guildId: string,
    prefix: string,
  ): Promise<GuildConfiguration>;
  updateWelcome(
    guildId: string,
    welcomeChannelId: string,
    welcomeMessage: string,
  ): Promise<GuildConfiguration>;
}
