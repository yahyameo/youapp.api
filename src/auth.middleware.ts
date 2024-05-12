import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }
  use(socket: Socket, next: () => void) {
    // Example authentication logic
    console.log("socket")
    const token:any = socket.handshake.query.token;
    const user = this.jwtService.verify(token,
        { secret: process.env.Secret }
    );
   
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    next();
  }
}