export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Review {
  userId: string;
  rating: number;
  comment: string;
}

export interface Recipe {
  id?: string; // ทำให้ id เป็น optional เพราะจะใช้ Document ID จาก Firestore แทน
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
  reviews: Review[];
  userId: string;
}