import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { authConfig, databaseConfig } from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';

// TODO: joi (or zod?) validation schema to Sequelize config
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig, authConfig] }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    ShoppingCartModule,
    PaymentModule,
  ],
})
export class AppModule {}
