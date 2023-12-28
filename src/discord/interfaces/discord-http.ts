export interface IDiscordHttpService {
  fetchBotGuilds();
  fetchUserGuilds(accessToken: string);
  fetchGuildChannels(guildId: string);
}
