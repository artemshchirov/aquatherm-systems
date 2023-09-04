import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 20;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
  });

  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
