import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Products extends Model {
  @Column
  vendor: string;

  @Column
  category: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  vendor_code: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  images: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: false })
  bestseller: boolean;

  @Column({ defaultValue: false })
  new: boolean;

  @Column
  popularity: number;
}
