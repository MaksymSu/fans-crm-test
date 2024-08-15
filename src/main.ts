import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('REST for Fans-crm test')
    .setVersion('1.0.0')
    .addTag('REST')
    .addBearerAuth({
      scheme: 'Bearer',
      type: 'http',
    }, 'accessToken')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => console.log('server started on port', port));
}

bootstrap();
