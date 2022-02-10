import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Recipe, RecipeId } from 'src/app/models/recipe';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeCollection: AngularFirestoreCollection<Recipe>;
  recipes: Observable<Recipe[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage

  ) {
    this.recipeCollection = afs.collection<Recipe>('recipes');
    this.recipes = this.recipeCollection.valueChanges();
   }

   getAllrecipes(){
     return this.afs.collection<Recipe>('recipes').snapshotChanges().pipe(
       map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as RecipeId
          data.id = a.payload.doc.id
          return data
       }))
     )
   }

   getLastRecipes(){
     return this.afs.collection<Recipe>('recipes', ref => ref.orderBy('created','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as RecipeId
        data.id = a.payload.doc.id
        return data
     }))
     )
   }

   getRecipeById(recipe:string){
     return this.afs.doc<Recipe>(`recipes/${recipe}`).snapshotChanges().pipe(
       map(a => {
         const data = a.payload.data() as RecipeId
         data.id = a.payload.id
         //console.log(data)
         return data
       }))
   }

   postRecipe(recipe: Recipe){
     return this.afs.collection<Recipe>('recipes').add(recipe)
   }

   onUploadImage(file: File){
    const filePath = `recipes/${file.name}`
    const ref = this.storage.ref(filePath)
    return this.storage.upload(filePath,file)
   }
}
