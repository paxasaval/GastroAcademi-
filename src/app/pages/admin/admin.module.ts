import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NuevoTestComponent } from './layer/nuevo-test/nuevo-test.component';
import { PreguntaOpcionalComponent } from './components/pregunta-opcional/pregunta-opcional.component';


@NgModule({
  declarations: [
    NuevoTestComponent,
    PreguntaOpcionalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
