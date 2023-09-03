export interface IProduct {
  id: number;
  vendor: string;
  category: string;
  price: number;
  vendor_code: string;
  name: string;
  description: string;
  images: string;
  in_stock: number;
  bestseller: boolean;
  new: boolean;
  popularity: number;
  compatibility: string;
}

export interface IProducts {
  count: number;
  rows: IProduct[];
}
