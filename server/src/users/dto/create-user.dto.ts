import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Artem' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'Artem123' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'artem@gmail.com' })
  @IsNotEmpty()
  readonly email: string;
}
