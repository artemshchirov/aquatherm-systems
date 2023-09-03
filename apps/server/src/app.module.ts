import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { databaseConfig } from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService
    }),
    ConfigModule.forRoot({ load: [databaseConfig] }),
    UsersModule,
    AuthModule,
    ProductsModule,
    ShoppingCartModule,
    PaymentModule
  ]
})
export class AppModule {}
