import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Ingredients, IngredientsId } from 'src/app/models/ingredients';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private ingredientCollection:AngularFirestoreCollection<Ingredients>
  ingredient: Observable<Ingredients[]>

  constructor(
    private afs:  AngularFirestore
  ) {
    this.ingredientCollection = afs.collection<Ingredients>('ingredient');
    this.ingredient = this.ingredientCollection.valueChanges();
   }

   getAllIingredient(){
    return this.afs.collection<Ingredients>('ingredient').snapshotChanges().pipe(
      map(actions => actions.map(a=>{
         const data = a.payload.doc.data() as IngredientsId
         data.id = a.payload.doc.id
         return data
      }))
    )
   }

   getIngredientsByCategory(category: string){
    return this.afs.collection<Ingredients>('ingredient', ref=>ref.where('category','==',category)).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as IngredientsId
        data.id = a.payload.doc.id
        return data
      }))
    )
   }

}
