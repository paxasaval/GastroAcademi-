import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  signUp(name: string, email: string, password:string): Observable<any>{
    return from(
      createUserWithEmailAndPassword(this.auth,email,password)
    ).pipe(switchMap(({user})=> updateProfile(user, {displayName: name})));
  }

  login(email: string, password: string): Observable<any>{
    return from(signInWithEmailAndPassword(this.auth,email,password));
  }

  logout(): Observable<any>{
    return from(this.auth.signOut())
  }

}
