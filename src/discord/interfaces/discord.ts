export interface IDiscordService {
  getBotGuilds();
  getUserGuilds(accessToken: string);
  getGuilds(accessToken: string);
  getGuildChannels(guildId: string);
}
