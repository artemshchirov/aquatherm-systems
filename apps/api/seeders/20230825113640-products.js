'use strict';

const { faker } = require('@faker-js/faker');

const productVendors = ['Art Box', 'Union', 'AMSTERDAM'];
const productCategories = ['Sets', 'Paints', 'Canvas'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [...Array(100)].map(() => ({
      vendor: productVendors[Math.floor(Math.random() * productVendors.length)],
      category: productCategories[Math.floor(Math.random() * productCategories.length)],
      price: faker.number.int(10000),
      name: faker.lorem.sentence(2),
      description: faker.lorem.sentence(10),
      images: JSON.stringify(
        [...Array(4)].map(
          () =>
            `${faker.image.urlLoremFlickr({
              category: 'technics',
            })}?random=${faker.number.int(30)}`,
        ),
      ),
      vendor_code: faker.internet.password(),
      in_stock: faker.number.int(100),
      bestseller: faker.datatype.boolean(),
      new: faker.datatype.boolean(),
      popularity: faker.number.int(1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const result = queryInterface.bulkInsert('Products', products);

    return result;
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
