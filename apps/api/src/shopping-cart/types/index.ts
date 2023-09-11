import { ApiProperty } from '@nestjs/swagger';

class ShoppingCartItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Dolorem reiciendis.' })
  name: string;

  @ApiProperty({ example: 150 })
  price: number;

  @ApiProperty({
    example: 'https://loremflickr.com/640/480/technics?lock=7076674155839488?random=13',
  })
  image: string;

  @ApiProperty({ example: 8 })
  in_stock: number;

  @ApiProperty({ example: 'Art Box' })
  vendor: string;

  @ApiProperty({ example: 'Sets' })
  category: string;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 3 })
  count: number;

  @ApiProperty({ example: 450 })
  total_price: number;

  @ApiProperty({ example: '2023-08-25T21:23:11.609Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-08-25T21:23:11.609Z' })
  updatedAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}
export class AddToCartResponse extends ShoppingCartItem {}
export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}
export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}
export class TotalPriceResponse {
  @ApiProperty({ example: 1000 })
  total_price: number;
}
export class TotalPriceRequest {
  @ApiProperty({ example: 1000 })
  total_price: number;
}
