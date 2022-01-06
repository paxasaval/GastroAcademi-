export interface Feedback {
  rating:number,
  recipe: string,
  user: string
}
export interface FeedbackId extends Feedback{id?: string}
