export interface Ingredients{
  measure: string,
  name: string,
  quality: number,
  recipe:string,
  value: number
}
export interface IngredientsId extends Ingredients{id?:string}
