import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';

@WebSocketGateway()
export class WebSocketHandler {
  @WebSocketServer()
  ws: Server;

  @SubscribeMessage('guilds')
  guildsHandler(@MessageBody() data: any) {
    console.log(data);
  }

  guildConfigUpdate(config: GuildConfiguration) {
    this.ws.emit('guildConfigUpdate', config);
  }

  announce(payload: object) {
    this.ws.emit('announce', payload);
  }
}
