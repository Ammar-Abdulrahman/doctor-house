export interface Product {
  id: number;
  sku: number;
  name: {
    ar: string;
    en: string;
  };
  price: number;
  rate: number;
  image: string;
  totalRates: number;
}

export interface ProductsRequest {
  url: string;
  image: string;
  description?: string;
}

export interface ProductsResponse {
  data: Product[];
}

export interface SingleProductResponse {
  data: Product;
}