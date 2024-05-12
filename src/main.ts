import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('YouApp')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: false }));
  await app.listen(process.env.Port);
}
bootstrap();
