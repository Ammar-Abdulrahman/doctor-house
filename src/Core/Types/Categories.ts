export interface Subcategory {
  id: number;
  name: string;
}

export interface CategoryRequest {
  name: {
    ar: string;
    en: string;
  };
  image: number;
  subcategories: Subcategory[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  subcategories: Subcategory[]
}

export interface CategoriesResponse {
  data: Category[];
  path: string;
  duration: string;
  method: string;
}
