import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class MakePaymentDto {
  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ example: 'Order №1' })
  @IsOptional()
  readonly description?: string;
}
