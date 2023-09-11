import { Injectable } from '@nestjs/common';
import { Products } from './products.model';
import { InjectModel } from '@nestjs/sequelize';
import { IProductsFilter, IProductsQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private productsModel: typeof Products,
  ) {}

  async paginateAndFilter(query: IProductsQuery): Promise<{ count: number; rows: Products[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IProductsFilter>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.vendor) {
      filter.vendor = JSON.parse(decodeURIComponent(query.vendor));
    }

    if (query.category) {
      filter.category = JSON.parse(decodeURIComponent(query.category));
    }

    return this.productsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

  async bestsellers(): Promise<{ count: number; rows: Products[] }> {
    return this.productsModel.findAndCountAll({
      where: { bestseller: true },
    });
  }

  async new(): Promise<{ count: number; rows: Products[] }> {
    return this.productsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOneById(id: number | string): Promise<Products> {
    return this.productsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Products> {
    return this.productsModel.findOne({
      where: { name },
    });
  }

  async searchByString(str: string): Promise<{ count: number; rows: Products[] }> {
    return this.productsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
