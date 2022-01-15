import { environment } from './../../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NuevoTestComponent } from './layer/nuevo-test/nuevo-test.component';
import { PreguntaOpcionalComponent } from './components/pregunta-opcional/pregunta-opcional.component';
import { LoginComponent } from './layer/login/login.component';
import { LayerComponent } from './layer/layer.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';


@NgModule({
  declarations: [
    NuevoTestComponent,
    PreguntaOpcionalComponent,
    LoginComponent,
    LayerComponent,
    SingInComponent,
    SingUpComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ]
})
export class AdminModule { }
