import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from '../../src/config/configuration';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import * as request from 'supertest';
import { PaymentModule } from '../../src/payment/payment.module';
import { PaymentService } from '../../src/payment/payment.service';

describe('Payment controller', () => {
  let app: INestApplication;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({ load: [databaseConfig] }),
        PaymentModule,
      ],
    }).compile();

    paymentService = testModule.get<PaymentService>(PaymentService);

    app = testModule.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should make payment', async () => {
    const data = await paymentService.makePayment({ amount: 100 });

    // FIXME: update after connecting payment API
    expect(data).toMatchObject({
      method: 'POST',
      url: 'http://example.com',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': expect.any(Number),
      },
      auth: {
        username: '204971',
        password: 'test_deg3128t583990',
      },
      data: {
        amount: {
          currency: 'ILS',
          value: 100,
        },
        capture: true,
        confirmation: {
          return_url: 'http://localhost:3001/order',
          type: 'redirect',
        },
        description: 'Order №1',
      },
    });
  });
});

// "method": "POST",
// "url": "http://example.com",
// "headers": {
// 		"Content-Type": "application/json",
// 		"Idempotence-Key": 1693088217426
// },
// "auth": {
// 		"username": "204971",
// 		"password": "test_deg3128t583990"
// },
// "data": {
// 		"amount": {
// 				"value": 100,
// 				"currency": "ILS"
// 		},
// 		"capture": true,
// 		"confirmation": {
// 				"type": "redirect",
// 				"return_url": "http://localhost:3001/order"
// 		},
// 		"description": "Order №1"
// }
