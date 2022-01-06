export interface Recipe{
  name?: string,
  portions?: number,
  image?: string,
  difficulty?: number,
  rating?: number,
}
export interface  RecipeId extends Recipe{id?: string}
