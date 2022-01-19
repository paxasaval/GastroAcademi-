import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Techniques, TechniquesId } from 'src/app/models/techniques';

@Injectable({
  providedIn: 'root'
})
export class TechniquesService {

  private techniquesCollection: AngularFirestoreCollection<Techniques>
  technique: Observable<Techniques[]>

  constructor(
    private afs: AngularFirestore
  ) { 
    this.techniquesCollection = afs.collection<Techniques>('techniques');
    this.technique = this.techniquesCollection.valueChanges();
  }

  getAllTechniques() {
    return this.afs.collection<Techniques>('techniques').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TechniquesId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }

  getTechniquesById(id: string) {
    return this.afs.collection<Techniques>('techniques', ref =>ref.where('id','==',id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TechniquesId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }

  postTechniques(technique: Techniques) {
    return this.afs.collection<Techniques>('techiques').add(technique)
  }
}
