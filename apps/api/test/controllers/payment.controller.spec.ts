import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from '../../src/config/configuration';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { User } from '../../src/users/users.model';
import bcrypt from 'bcrypt';
import request from 'supertest';
import passport from 'passport';
import session from 'express-session';

import { AuthModule } from '../../src/auth/auth.module';
import { PaymentModule } from '../../src/payment/payment.module';

const mockedUser = {
  username: 'John',
  password: 'john123',
  email: 'john@gmail.com',
};

// const mockedPay = {
//   status: 'pending',
//   amount: {
//     value: '100.00',
//     currency: 'ILS'
//   }
// };

describe('Payment controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({ load: [databaseConfig] }),
        PaymentModule,
        AuthModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await app.close();
  });

  it('should make payment', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post(`/payment`)
      .send({ amount: 100 })
      .set('Cookie', login.headers['set-cookie']);

    // FIXME: after connecting payment API
    // expect(response.body.status).toEqual(mockedPay.status);
    // expect(response.body.amount).toEqual(mockedPay.amount);
  });
});
