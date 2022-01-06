export interface Instructions {
  description: string,
  recipe: string
}
export interface InstructionsId extends Instructions{id?:string}
