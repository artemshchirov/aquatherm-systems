import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from '../../src/config/configuration';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { UsersModule } from '../../src/users/users.module';
import { User } from '../../src/users/users.model';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';

describe('Users controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService
        }),
        ConfigModule.forRoot({ load: [databaseConfig] }),
        UsersModule
      ]
    }).compile();

    app = testModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: 'Test' } });
    await app.close();
  });

  it('should create user', async () => {
    const newUser = {
      username: 'Test',
      password: 'Test123',
      email: 'test@gmail.com'
    };

    const response = await request(app.getHttpServer()).post('/users/signup').send(newUser);

    const passwordIsValid = await bcrypt.compare(newUser.password, response.body.password);

    expect(response.body.username).toBe(newUser.username);
    expect(passwordIsValid).toBe(true);
    expect(response.body.email).toBe(newUser.email);
  });
});
