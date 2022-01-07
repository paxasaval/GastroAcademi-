import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Instructions, InstructionsId } from 'src/app/models/instructions';
import { RecipeId } from 'src/app/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class InstructionsService {
  private instructionsCollection: AngularFirestoreCollection<Instructions>;
  instructions_s: Observable<Instructions[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFirestore
  ) { 
    this.instructionsCollection = afs.collection<Instructions>('instructions');
    this.instructions_s = this.instructionsCollection.valueChanges();
  }

  getAllInstructions() {
    return this.afs.collection<Instructions>('instructions', ref => ref.orderBy('position','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as InstructionsId
        data.id = a.payload.doc.id;
        return data
      }))
    )
  }

  getInstructionByRecipe(recipe : string) {
    return this.afs.collection<Instructions>('instructions', ref => ref.where('recipe', '==', recipe)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as InstructionsId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }


}
