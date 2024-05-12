import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { AuthGuard } from './guard/auth.guard';
import { CustomMessage } from './utils/decorator/custom-message.decorator';
import { AuthUser } from './utils/auth.user';
import { User } from './utils/decorator/user.decorator';
import { SocketGateway } from './socket.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly websocketsGateway: SocketGateway
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
