import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MakePaymentDto {
  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  readonly amount: number;
}

export class MakePaymentResponse {
  @ApiProperty({ example: '2b9e50d0' })
  id: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: { value: 100, currency: 'ILS' } })
  amount: {
    value: string;
    currency: string;
  };

  @ApiProperty({ example: 'Order №1' })
  description: string;

  @ApiProperty({
    example: { type: 'redirect', confirmation_url: 'http://example.com' }
  })
  confirmation: {
    type: string;
    confirmation_url: string;
  };

  @ApiProperty({ example: { account_id: '204971', gateway_id: '2057935' } })
  recipient: {
    account_id: string;
    gateway_id: string;
  };

  @ApiProperty({ example: true })
  test: boolean;

  @ApiProperty({ example: false })
  paid: boolean;

  @ApiProperty({ example: false })
  refundable: boolean;

  @ApiProperty({ example: {} })
  metadata: object;
}
