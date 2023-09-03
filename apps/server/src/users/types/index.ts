import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Artem' })
  username: string;

  @ApiProperty({ example: 'Artem123' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'Artem',
        password: 'Artem123'
      }
    }
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'session has ended' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: string;

  @ApiProperty({ example: 'Artem' })
  username: string;

  @ApiProperty({ example: 'artem@gmail.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: 'Artem' })
  username: string;

  @ApiProperty({
    example: '$2b$10$vPtnNkNUYJ/Sj9NtFrZRJOBapBf/.4kAr4929klYd6yA7gd3Hd09C'
  })
  password: string;

  @ApiProperty({ example: 'artem@gmail.com' })
  email: string;

  @ApiProperty({ example: '2023-08-25T10:33:49.550Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-08-25T10:33:49.550Z' })
  createdAt: string;
}
