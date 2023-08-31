import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Op } from 'sequelize';

export interface IProducts {
  limit: string;
  offset: string;
}

class Products {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: faker.lorem.word(2) })
  vendor: string;

  @ApiProperty({ example: faker.lorem.word(1) })
  category: string;

  @ApiProperty({ example: 123 })
  price: string;

  @ApiProperty({ example: faker.internet.password() })
  vendor_code: string;

  @ApiProperty({ example: faker.lorem.word() })
  name: string;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  description: string;

  @ApiProperty({ example: faker.image.url() })
  images: string;

  @ApiProperty({ example: 5 })
  in_stock: number;

  @ApiProperty({ example: true })
  bestseller: boolean;

  @ApiProperty({ example: true })
  new: boolean;

  @ApiProperty({ example: 123 })
  popularity: number;

  @ApiProperty({ example: '2023-08-25T13:38:59.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-08-25T13:38:59.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Products, isArray: true })
  rows: Products;
}

export class Bestsellers extends Products {
  @ApiProperty({ example: true })
  bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Products, isArray: true })
  rows: Bestsellers;
}

export class NewProducts extends Products {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Products, isArray: true })
  rows: NewProducts;
}

export class SearchByLetterResponse extends Products {
  @ApiProperty({ example: 'Dicta optio.' })
  name: string;
}
export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}
export class SearchRequest {
  @ApiProperty({ example: 'a' })
  search: string;
}

export class GetByNameResponse extends Products {
  @ApiProperty({ example: 'Dicta optio.' })
  name: string;
}
export class GetByNameRequest {
  @ApiProperty({ example: 'Dicta optio.' })
  name: string;
}

export class FindOneResponse extends Products {}

export interface IProductsQuery {
  limit: string;
  offset: string;
  vendor: string | undefined;
  category: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}

export interface IProductsFilter {
  vendor: string | undefined;
  category: string | undefined;
  price: { [Op.between]: number[] };
}
