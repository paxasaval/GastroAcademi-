export interface Instructions {
  position?: number
  description?: string,
  recipe?: string
}
export interface InstructionsId extends Instructions{id?:string}
