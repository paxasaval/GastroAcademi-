import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { TechniquesRecipe, TechniquesRecipeId } from 'src/app/models/techniques-recipe';

@Injectable({
  providedIn: 'root'
})
export class TechniquesRecipeService {
  
  private techniquesRecipeCollection: AngularFirestoreCollection<TechniquesRecipe>
  techniqueRecipe: Observable<TechniquesRecipe[]>

  constructor( 
    private afs: AngularFirestore
  ) { 
    this.techniquesRecipeCollection = afs.collection<TechniquesRecipe>('techniquesRecipe');
    this.techniqueRecipe = this.techniquesRecipeCollection.valueChanges();
  }

  getAllTechniquesRecipe() {
    return this.afs.collection<TechniquesRecipe>('techniquesRecipe').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TechniquesRecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }

  getTechniquesRecipeById(id: string) {
    return this.afs.collection<TechniquesRecipe>('techniquesRecipe', ref => ref.where('id', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TechniquesRecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }

  getTechniquesRecipeByRecipe(recipe: string){
    return this.afs.collection<TechniquesRecipe>('techniquesRecipe', ref => ref.where('recipe', '==', recipe)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TechniquesRecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )

  }

  postTechniquesRecipe(techniqueRecipe: TechniquesRecipe) {
    return this.afs.collection<TechniquesRecipe>('techniquesRecipe').add(techniqueRecipe)
  }
}
