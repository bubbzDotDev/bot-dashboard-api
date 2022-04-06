import { Injectable } from '@nestjs/common';
import { IDiscordHttpService } from '../interfaces/discord-http';
import axios from 'axios';
import { PartialGuild, PartialGuildChannel } from 'src/utils/types';
import { DISCORD_BASE_URL } from 'src/utils/constants';

@Injectable()
export class DiscordHttpService implements IDiscordHttpService {
  fetchBotGuilds() {
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<PartialGuild[]>(`${DISCORD_BASE_URL}/users/@me/guilds`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      },
    });
  }

  fetchUserGuilds(accessToken: string) {
    return axios.get<PartialGuild[]>(`${DISCORD_BASE_URL}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  fetchGuildChannels(guildId: string) {
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<PartialGuildChannel[]>(
      `${DISCORD_BASE_URL}/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
      },
    );
  }
}
