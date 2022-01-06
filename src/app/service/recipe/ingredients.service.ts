import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Ingredients, IngredientsId } from 'src/app/models/ingredients';
import { RecipeId } from 'src/app/models/recipe';
@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private ingredientsCollection: AngularFirestoreCollection<Ingredients>;
  ingredients_s: Observable<Ingredients[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFirestore
  ) {
    this.ingredientsCollection = afs.collection<Ingredients>('ingredients');
    this.ingredients_s = this.ingredientsCollection.valueChanges();
   }

   getAllIngredients(){
     return this.afs.collection<Ingredients>('ingredients').snapshotChanges().pipe(
       map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as IngredientsId
          data.id = a.payload.doc.id
          return data
       }))
     )
   }

   getIngredientsByRecipe(recipe: string){
    return this.afs.collection<Ingredients>('ingredients', ref=>ref.where('recipe','==',recipe)).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as RecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
   }

   getIngredientsByName(name: string){
    return this.afs.collection<Ingredients>('ingredients', ref=>ref.where('name','==',name)).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as RecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
   }

  }
