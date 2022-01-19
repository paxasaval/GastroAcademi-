import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Types, TypesId } from 'src/app/models/types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private typeCollection: AngularFirestoreCollection<Types>
  types: Observable<Types[]>

  constructor(
    private afs: AngularFirestore
  ) {
    this.typeCollection = afs.collection<Types>('types')
    this.types = this.typeCollection.valueChanges();
   }

   getAllTypes(){
     return this.afs.collection<Types>('types').snapshotChanges().pipe(
       map(actions => actions.map(a=>{
         const data = a.payload.doc.data() as TypesId
         data.id = a.payload.doc.id
         return data
       }))
     )
   }
}
