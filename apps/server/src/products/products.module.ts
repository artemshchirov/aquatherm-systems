import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './products.model';

@Module({
  imports: [SequelizeModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
