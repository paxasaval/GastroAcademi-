import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { from, map, Observable, switchMap } from 'rxjs';
import { User, UserId } from 'src/app/models/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private userSerevice: UserService) { }

  signUp(name: string, email: string, password: string, rol:string): Observable<any> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) =>
        updateProfile(user, { displayName: name }).then(()=>{
          var newUser: User = {}
          newUser.mail=email
          newUser.name=name
          newUser.rol=rol
          newUser.uid=user.uid
          this.userSerevice.postUser(user)
        })
      ),
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut())
  }

}