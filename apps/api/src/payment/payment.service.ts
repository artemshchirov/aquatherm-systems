import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { MakePaymentDto } from './dto/make-payment-dto';
import { CheckPaymentDto } from './dto/check-payment.dto';

@Injectable()
export class PaymentService {
  async makePayment(makePaymentDto: MakePaymentDto) {
    try {
      const paymentData = {
        method: 'POST',
        url: 'http://example.com',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': Date.now()
        },
        auth: {
          username: '204971',
          password: 'test_deg3128t583990'
        },
        data: {
          amount: {
            value: makePaymentDto.amount,
            currency: 'ILS'
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:3000/order',
            confirmation_url: 'http://example.com'
          },
          description: makePaymentDto.description
        }
      };
      // const { data } = await axios(paymentData);

      // FIXME: uncomment after connecting payment API
      // return data;
      return paymentData;
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  // WARN: works only for yookassa
  async checkPayment(checkPaymentDto: CheckPaymentDto) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://api.yookassa.ru/v3/payments/${checkPaymentDto.paymentId}`,
        auth: {
          username: '204971',
          password: 'test_dgisbcPctB1RjjKeSBzdIuXJR0IRTFKm6Rdi9eNGZxE'
        }
      });

      return data;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
