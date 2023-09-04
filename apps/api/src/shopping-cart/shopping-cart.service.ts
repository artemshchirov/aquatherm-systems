import { Injectable } from '@nestjs/common';
import { ShoppingCart } from './shopping-cart.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private shoppingCartModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username }
    });
    const product = await this.productsService.findOneById(addToCartDto.productId);

    cart.userId = user.id;
    cart.productId = product.id;
    cart.vendor = product.vendor;
    cart.category = product.category;
    cart.price = product.price;
    cart.in_stock = product.in_stock;
    cart.image = JSON.parse(product.images)[0];
    cart.name = product.name;
    cart.total_price = product.price;

    return cart.save();
  }

  async updateCount(count: number, productId: number | string): Promise<{ count: number }> {
    await this.shoppingCartModel.update({ count }, { where: { productId } });

    const product = await this.shoppingCartModel.findOne({
      where: { productId }
    });

    return { count: product.count };
  }

  async updateTotalPrice(
    total_price: number,
    productId: number | string
  ): Promise<{ total_price: number }> {
    await this.shoppingCartModel.update({ total_price }, { where: { productId } });

    const product = await this.shoppingCartModel.findOne({
      where: { productId }
    });

    return { total_price: product.total_price };
  }

  async remove(productId: number | string): Promise<void> {
    const product = await this.shoppingCartModel.findOne({
      where: { productId }
    });

    await product.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { userId } });
  }
}
