import { IngredientsId } from 'src/app/models/ingredients';

export interface IngredientsRecipe{
  ingredient?: string|IngredientsId,
  alias?:string,
  recipe?:string,
  measure?: string,
  quantity?: number,
}
export interface IngredientsRecipeId extends IngredientsRecipe {id:string}
