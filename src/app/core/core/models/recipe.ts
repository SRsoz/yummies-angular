export interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  createdAt?: string;
  userId?: string;
}
