export interface Subcategory {
  id: number;
  name: {
    ar: string;
    en: string;
  };
}
export interface SubcategoryRequest {
  name: {
    en: string;
    ar: string;
  };
}

export interface CategoryRequest {
  name: {
    ar: string;
    en: string;
  };
  image: number;
  subcategories: SubcategoryRequest[];
}

export interface Category {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  image: string;
  subcategories: Subcategory[];
}

export interface CategoriesResponse {
  data: Category[];
  path: string;
  duration: string;
  method: string;
}

export interface SingleCategoryResponse {
  data: Category;
}

export interface CategoryOne {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  image: string;
  subcategories: SubcategoryRequest[];
}
