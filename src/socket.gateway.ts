// socket.gateway.ts
import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthMiddleware } from './auth.middleware';
import * as cors from 'cors';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './utils/auth.user';

@WebSocketGateway()
// @UseGuards(AuthMiddleware)
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private clients: Map<string, Socket> = new Map<string, Socket>();
  @WebSocketServer() server: Server;
  constructor(private jwtService: JwtService) {

  }
  afterInit() {
    console.log('Socket gateway initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected: ', client.id);
    client.on('authenticate', (data) => {
      const { token } = data;
      const user = this.jwtService.verify(token,
        { secret: process.env.Secret }
      ) as AuthUser;
      console.log("auth", user);
      if (user) {
        console.log(`Authenticated: ${client.id}`);
        client.emit('authenticated');
        // client.join(user.userId);
      } else {
        console.log(`Authentication failed: ${client.id}`);
        client.emit('unauthorized', { message: 'Invalid token' });
        client.disconnect();
      }
    });
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ', client.id);
  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, userId: string) {
    console.log(`Client ${client.id} joining room ${userId}`);
    client.join(userId);
  }
  @SubscribeMessage('sendMessageToRoom')
  handleMessageToRoom(client: Socket, { userId, message }: { userId: string, message: string }) {
    console.log(`Client ${client.id} sending message to room ${userId}: ${message}`);
    let date = new Date();
    this.server.to(userId).emit('onNewMessage', { userId, message, date });
  }
}
