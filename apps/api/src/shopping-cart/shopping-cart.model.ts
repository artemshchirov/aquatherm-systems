import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column(DataType.INTEGER)
  userId: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  productId: number;

  @Column(DataType.STRING)
  vendor: string;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  image: string;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  price: number;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  total_price: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  in_stock: number;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  count: number;
}
