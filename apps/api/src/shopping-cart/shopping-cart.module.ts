import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingCart]), UsersModule, ProductsModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
