import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MakePaymentDto, MakePaymentResponse } from './types';
import { PaymentService } from './payment.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { CheckPaymentDto } from './dto/check-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOkResponse({ type: MakePaymentResponse })
  @UseGuards(AuthenticatedGuard)
  @Post()
  makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/info')
  checkPayment(@Body() checkPaymentDto: CheckPaymentDto) {
    return this.paymentService.checkPayment(checkPaymentDto);
  }
}
