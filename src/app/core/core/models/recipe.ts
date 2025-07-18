export interface Recipe {
  _id?: string;
  title: string;
  ingredients: string[];
  instructions: string;
  createdAt?: string;
  userId?: string;
}
