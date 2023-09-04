import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from '../../src/config/configuration';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { ProductsService } from '../../src/products/products.service';
import { ProductsModule } from '../../src/products/products.module';

describe('Auth service', () => {
  let app: INestApplication;
  let productsService: ProductsService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService
        }),
        ConfigModule.forRoot({ load: [databaseConfig] }),
        ProductsModule
      ]
    }).compile();

    productsService = testModule.get<ProductsService>(ProductsService);
    app = testModule.createNestApplication();

    await app.init();
  });

  it('should find product by id', async () => {
    const product = await productsService.findOneById(1);

    expect(product.dataValues).toEqual(
      expect.objectContaining({
        id: 1,
        price: expect.any(Number),
        vendor: expect.any(String),
        category: expect.any(String),
        vendor_code: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
  });

  it('should find product by name', async () => {
    const product = await productsService.findOneByName('Ipsam nam.');

    expect(product.dataValues).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        price: expect.any(Number),
        vendor: expect.any(String),
        category: expect.any(String),
        vendor_code: expect.any(String),
        name: 'Ipsam nam.',
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
  });

  it('should find product by search string', async () => {
    const products = await productsService.searchByString('nos');

    expect(products.rows.length).toBeLessThanOrEqual(20);

    products.rows.forEach(product => {
      expect(product.name.toLowerCase()).toContain('nos');

      expect(product.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          price: expect.any(Number),
          vendor: expect.any(String),
          category: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      );
    });
  });

  it('should find bestsellers', async () => {
    const products = await productsService.bestsellers();

    products.rows.forEach(product => {
      expect(product.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          price: expect.any(Number),
          vendor: expect.any(String),
          category: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: true,
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      );
    });
  });

  it('should find new products', async () => {
    const products = await productsService.new();

    products.rows.forEach(product => {
      expect(product.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          price: expect.any(Number),
          vendor: expect.any(String),
          category: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: true,
          popularity: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      );
    });
  });
});
