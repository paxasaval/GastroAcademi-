import { SingInComponent } from './components/sing-in/sing-in.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layer/login/login.component';
import { LayerComponent } from './layer/layer.component';
import { NuevoTestComponent } from './layer/nuevo-test/nuevo-test.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path:'home',
    component: LayerComponent
  },
  {
    path:'login' ,
    component: LoginComponent,
    children:[
      {
        path:'',
        redirectTo: 'signIn'
      },
      {
        path:'signIn',
        component: SingInComponent
      },
      {
        path:'signUp',
        component: SingUpComponent
      }
    ]
  },
  {
    path:'newRecipe',
    component: NuevoTestComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"**",
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
