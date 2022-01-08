export interface Ingredients{
  measure?: string,
  name?: string,
  quantity?: number,
  recipe?:string,
}
export interface IngredientsId extends Ingredients{id?:string}
