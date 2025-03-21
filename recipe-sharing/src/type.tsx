export interface Ingredient {
  name: string;
  quantity: string;
}
export interface Recipe { //เอา Component เข้าไปใช้ร่วมกับ Firebase
  id?: string; 
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
}
