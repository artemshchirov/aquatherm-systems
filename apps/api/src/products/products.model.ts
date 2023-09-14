import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table
export class Products extends Model {
  @Column(DataType.STRING)
  vendor: string;

  @Column(DataType.STRING)
  category: string;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  price: number;

  @Column(DataType.STRING)
  vendor_code: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING(2048))
  description: string;

  @Column(DataType.STRING(2048))
  images: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  in_stock: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  bestseller: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  new: boolean;

  @Column(DataType.INTEGER)
  popularity: number;
}
