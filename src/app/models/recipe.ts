import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Recipe{
  name?: string,
  portions?: number,
  image?: string,
  difficulty?: number,
  rating?: number,
  type?: string,
  created?: Timestamp
}
export interface  RecipeId extends Recipe{id?: string}
