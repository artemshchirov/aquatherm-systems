import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from '../../src/config/configuration';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { User } from '../../src/users/users.model';
import * as bcrypt from 'bcrypt';
import { ProductsModule } from '../../src/products/products.module';
import { ProductsService } from '../../src/products/products.service';
import { UsersService } from '../../src/users/users.service';
import { ShoppingCart } from '../../src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from '../../src/shopping-cart/shopping-cart.module';
import { ShoppingCartService } from '../../src/shopping-cart/shopping-cart.service';

const mockedUser = {
  username: 'John',
  password: 'john123',
  email: 'john@gmail.com',
};

describe('Shopping Cart service', () => {
  let app: INestApplication;
  let productsService: ProductsService;
  let usersService: UsersService;
  let shoppingCartService: ShoppingCartService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({ load: [databaseConfig] }),
        ShoppingCartModule,
        ProductsModule,
      ],
    }).compile();

    productsService = testModule.get<ProductsService>(ProductsService);
    usersService = testModule.get<UsersService>(UsersService);
    shoppingCartService = testModule.get<ShoppingCartService>(ShoppingCartService);

    app = testModule.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new ShoppingCart();
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const product = await productsService.findOneById(1);

    cart.userId = user.id;
    cart.productId = product.id;
    cart.vendor = product.vendor;
    cart.price = product.price;
    cart.in_stock = product.in_stock;
    cart.image = JSON.parse(product.images)[0];
    cart.name = product.name;
    cart.total_price = product.price;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { productId: 1 } });
    await app.close();
  });

  it('should return all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    cart.forEach(item =>
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          productId: expect.any(Number),
          price: expect.any(Number),
          vendor: expect.any(String),
          name: expect.any(String),
          image: expect.any(String),
          count: expect.any(Number),
          total_price: expect.any(Number),
          in_stock: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ),
    );
  });

  it('should add cart item', async () => {
    await shoppingCartService.add({
      username: mockedUser.username,
      productId: 3,
    });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find(item => item.productId === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        productId: 3,
        price: expect.any(Number),
        vendor: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
        count: expect.any(Number),
        total_price: expect.any(Number),
        in_stock: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should return updated item count', async () => {
    const result = await shoppingCartService.updateCount(2, 1);

    expect(result).toEqual({ count: 2 });
  });

  it('should return updated total price', async () => {
    const product = await productsService.findOneById(1);
    const result = await shoppingCartService.updateTotalPrice(product.price * 3, 1);

    expect(result).toEqual({ total_price: product.price * 3 });
  });

  it('should delete cart item', async () => {
    await shoppingCartService.remove(1);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find(item => item.productId === 1)).toBeUndefined();
  });

  it('should delete all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await shoppingCartService.removeAll(user.id);

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart).toStrictEqual([]);
  });
});
