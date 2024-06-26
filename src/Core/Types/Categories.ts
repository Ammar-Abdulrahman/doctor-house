export interface Subcategory {
  id: number;
  name: string;
}
export interface SubcategoryOne {
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
  subcategories: SubcategoryOne[];
}

export interface Category {
  id: number;
  name: string;
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
  data: CategoryOne;
}

export interface CategoryOne {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  image: string;
  subcategories: SubcategoryOne[];
}
