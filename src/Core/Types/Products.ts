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
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  price: number;
  image: number;
  subcategory: number;
  variants: ProductVariant[];
  stockKeepUnits: ProductSku[];
}
export interface ProductsResponse {
  data: Product[];
}

export interface SingleProductResponse {
  data: Product;
}

export interface ProductVariant {
  name: {
    ar: string;
    en: string;
  };
  values: string[];
  type: string;
}

export interface ProductSku {
  variants: { name: string; value: string }[];
  image: number;
  price: number;
  quantity: number;
}
