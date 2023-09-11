import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  const port = process.env.PORT || 3001;
  const host = process.env.HOST || 'localhost';

  setupSession(app);

  swaggerSetup(app);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  });

  await app.listen(port, host, () => {
    Logger.log(`Server running on http://${host}:${port}`, 'Bootstrap');
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

const setupSession = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const { secret } = configService.get('auth');

  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};

const swaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
};

bootstrap();
