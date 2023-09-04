import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  userId: number;

  @Column({ defaultValue: 0 })
  productId: number;

  @Column
  vendor: string;

  @Column
  category: string;

  @Column
  name: string;

  @Column
  image: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column({ defaultValue: 0 })
  total_price: number;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: 1 })
  count: number;
}
