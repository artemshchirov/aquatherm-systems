import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { MakePaymentDto } from './dto/make-payment-dto';

@Injectable()
export class PaymentService {
  async makePayment(makePaymentDto: MakePaymentDto) {
    try {
      const paymentData = {
        method: 'POST',
        url: 'http://example.com',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': Date.now(),
        },
        auth: {
          username: '204971',
          password: 'test_deg3128t583990',
        },
        data: {
          amount: {
            value: makePaymentDto.amount,
            currency: 'ILS',
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:3001/order',
          },
          description: 'Order №1',
        },
      };
      const { data } = await axios(paymentData);

      // return data;  // for production
      return paymentData;
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
