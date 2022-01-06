import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Recipe, RecipeId } from 'src/app/models/recipe';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeCollection: AngularFirestoreCollection<Recipe>;
  recipes: Observable<Recipe[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFirestore
  ) {
    this.recipeCollection = afs.collection<Recipe>('recipe');
    this.recipes = this.recipeCollection.valueChanges();
   }

   getAllrecipes(){
     return this.afs.collection<Recipe>('recipe').snapshotChanges().pipe(
       map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as RecipeId
          data.id = a.payload.doc.id
          return data
       }))
     )
   }
}
