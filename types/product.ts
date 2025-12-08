export interface Product {
  id: string;
  sellerId: string;
  name: string;
  price: string;
  description: string;
  publishedAt: string;
  imageUrl: string;
  isHidden: boolean;
  totalSold: number;
  createdAt: string;
  updatedAt: string;
  isFavorited?: boolean;
}

export interface ProductResponse {
  items: Product[];
  total: number;
  totalPages: number;
}
