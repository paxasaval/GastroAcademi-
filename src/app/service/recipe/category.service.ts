import { CategoryId } from './../../models/category';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection: AngularFirestoreCollection<Category>;
  categorys: Observable<Category[]>

  constructor(
    private afs: AngularFirestore,

  ) {
    this.categoryCollection = afs.collection<Category>('category');
    this.categorys = this.categoryCollection.valueChanges();
  }

  getAllCategorys() {
    return this.afs.collection<Category>('category').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CategoryId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }


}
