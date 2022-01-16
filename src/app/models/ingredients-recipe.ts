export interface IngredientsRecipe{
  ingredient?: string,
  name?:string,
  recipe?:string,
  measure?: string,
  quantity?: number,
}
export interface IngredientsRecipeId extends IngredientsRecipe {id:string}
