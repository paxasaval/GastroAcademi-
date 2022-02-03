import { Techniques } from "./techniques";

export interface TechniquesRecipe{
  technique?: Techniques,
  description?: string,
  recipe?:string
}export interface TechniquesRecipeId extends TechniquesRecipe{id:string}
