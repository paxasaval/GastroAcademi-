import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, reduce } from 'rxjs';
import { Feedback, FeedbackId } from 'src/app/models/feedback';
import { RecipeId } from 'src/app/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackCollection: AngularFirestoreCollection<Feedback>;
  feedback_s: Observable<Feedback[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFirestore
  ) {
    this.feedbackCollection = afs.collection<Feedback>('feedback');
    this.feedback_s = this.feedbackCollection.valueChanges();
  }

  getAllFeedback() {
    return this.afs.collection<Feedback>('feedback').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as FeedbackId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }

  getFeedbackByRecipe(recipe: string) {
    return this.afs.collection<Feedback>('feedback', ref => ref.where('recipe', '==', recipe)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RecipeId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }

  getFeedbackByRating(rating: number) {
    return this.afs.collection<Feedback>('feedback', ref => ref.where('rating', '==', rating)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as FeedbackId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }
  //getFeedackByuser
  getFeedbackByUser(user : string) {
    return this.afs.collection<Feedback>('feedback', ref => ref.where('user', '==', user)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserId
        data.id = a.payload.doc.id
        return data
      }))
    )
  }
}

