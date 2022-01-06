import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { RecipeId } from 'src/app/models/recipe';
import { Times, TimesId } from 'src/app/models/times';

@Injectable({
  providedIn: 'root'
})
export class TimesService {
  private timesCollection: AngularFirestoreCollection<Times>;
  times_s: Observable<Times[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFirestore
  ) { 
    this.timesCollection = afs.collection<Times>('times');
    this.times_s = this.timesCollection.valueChanges();
  }

  getAllTimes() {
    return this.afs.collection<Times>('times').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TimesId
        data.id = a.payload.doc.id
        return data;
      }))
    )
  }

  getTimesByRecipe(recipe : string) {
    return this.afs.collection<Times>('times', ref => ref.where('recipe', '==', recipe)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }
}
