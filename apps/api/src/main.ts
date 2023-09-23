import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session = require('express-session');
import passport = require('passport');
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SessionOptions } from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3001;
  const host = process.env.HOST || 'localhost';

  setupSession(app);

  setupSwagger(app);

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'https://ecommerce-template-web.vercel.app',
    ],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, host, () => {
    Logger.log(`Server running on http://${host}:${port}`, 'Bootstrap');
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

const setupSession = (app: NestExpressApplication) => {
  const configService = app.get(ConfigService);
  const { secret } = configService.get('auth');

  const sessionConfig: SessionOptions = {
    secret,
    name: 'ecommerce-template',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    },
  };

  if (process.env.APP_ENV === 'prod') {
    app.set('trust proxy', 1);
    sessionConfig.cookie.secure = true;
  }

  app.use(session(sessionConfig));

  app.use(passport.initialize());
  app.use(passport.session());
};

const setupSwagger = (app: NestExpressApplication) => {
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
