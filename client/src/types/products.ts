export interface IProduct {
  id: number
  boiler_manufacturer: string
  price: number
  products_manufacturer: string
  vendor_code: string
  name: string
  description: string
  images: string
  in_stock: number
  bestseller: boolean
  new: boolean
  popularity: number
  compatibility: string
}

export interface IProducts {
  count: number
  rows: IProduct[]
}
