import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.sass']
})
export class SingInComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  });

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  submit(){
    if(!this.loginForm.valid){
      return
    }
    const {email, password} = this.loginForm.value;
    this.authService.login(email,password).pipe(
      this.toast.observe({
        success: 'Ha iniciado sesion con exito',
        loading: 'Iniciando sesion',
        error: 'Ha ocurrido un error al iniciar sesion, Intente mas tarde'
      })
    ).subscribe(()=>{
      this.router.navigate([''])
    });
  }
  signUp(){
    this.router.navigate(['admin/login/signUp'])
  }

}
