import { Injectable } from '@nestjs/common';
import { IDiscordHttpService } from '../interfaces/discord-http';
import { DISCORD_BASE_URL } from 'src/utils/constants';

@Injectable()
export class DiscordHttpService implements IDiscordHttpService {
  async fetchBotGuilds() {
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    const response = await fetch(`${DISCORD_BASE_URL}/users/@me/guilds`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      },
    });
    return response.json();
  }

  async fetchUserGuilds(accessToken: string) {
    const response = await fetch(`${DISCORD_BASE_URL}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }

  async fetchGuildChannels(guildId: string) {
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    const response = await fetch(
      `${DISCORD_BASE_URL}/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
      },
    );
    return response.json();
  }
}
