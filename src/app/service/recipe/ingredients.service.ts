import { IngredientsRecipeId, IngredientsRecipe } from './../../models/ingredients-recipe';
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
    this.ingredientsCollection = afs.collection<Ingredients>('ingredientsRecipe');
    this.ingredients_s = this.ingredientsCollection.valueChanges();
   }

   getAllIngredients(){
     return this.afs.collection<IngredientsRecipe>('ingredientsRecipe').snapshotChanges().pipe(
       map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as IngredientsRecipeId
          data.id = a.payload.doc.id
          return data
       }))
     )
   }

   getIngredientsByRecipe(recipe: string){
    return this.afs.collection<IngredientsRecipe>('ingredientsRecipe', ref=>ref.where('recipe','==',recipe)).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as IngredientsRecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
   }

   getIngredientsByName(name: string){
    return this.afs.collection<IngredientsRecipe>('ingredientsRecipe', ref=>ref.where('name','==',name)).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as IngredientsRecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
   }

   getIngredientsByIngredient(ingredient:string){
    return this.afs.collection<IngredientsRecipe>('ingredientsRecipe', ref=>ref.where('ingredient','==',ingredient)).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as IngredientsRecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
   }

   postIngredients(ingredientRecipe: IngredientsRecipe){
     return this.afs.collection<IngredientsRecipe>('ingredientsRecipe').add(ingredientRecipe)
   }

  }
