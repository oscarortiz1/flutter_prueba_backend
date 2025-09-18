import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: '*',
    }
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));
  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3000;

  // Swagger setup
  const configSwagger = new DocumentBuilder()
    .setTitle('Flutter Prueba Backend')
    .setDescription('API de prueba con users, movimientos y auth')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  console.log(`Listening on http://localhost:${port}`);
}

bootstrap();
