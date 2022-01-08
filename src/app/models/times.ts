export interface Times{
  measure?: string,
  name?: string,
  recipe?: string,
  total?: number
}
export interface TimesId extends Times{id?:string}
