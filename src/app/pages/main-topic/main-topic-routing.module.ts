import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayerComponent } from './layer/layer.component';

const routes: Routes = [
  {
    path:'Tecnicas-culinarias',
    component: LayerComponent,
    data:{name:'Tecnicas Culinarias'}
  },
  {
    path:'Metodos-de-Coocion',
    component: LayerComponent,
    data:{name:'Meteodos de Coocion'}
  },
  {
    path:'Metodos-de-conservacion',
    component: LayerComponent,
    data:{name:'Metodos de Conservacion'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainTopicRoutingModule { }
