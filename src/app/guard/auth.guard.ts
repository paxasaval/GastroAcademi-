import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, switchMap } from 'rxjs';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private userSerevice: UserService,
    private router: Router,
  ) {}

  canActivate(){
    return this.userSerevice.getUserById(localStorage.getItem('user')!).pipe(
      take(1),
      switchMap(async (user)=>{
        if(user.rol==='Administrador'){
          return true
        }else{
          this.router.navigate(['/admin/login'])
          return false
        }
      })
    )
  }

}
