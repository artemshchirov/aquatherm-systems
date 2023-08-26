import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MakePaymentDto, MakePaymentResponse } from './dto/make-payment-dto';
import { PaymentService } from './payment.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOkResponse({ type: MakePaymentResponse })
  @UseGuards(AuthenticatedGuard)
  @Post()
  makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}
