import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoTestComponent } from './layer/nuevo-test/nuevo-test.component';

const routes: Routes = [
  {
    path:'nuevo_test',
    component: NuevoTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
