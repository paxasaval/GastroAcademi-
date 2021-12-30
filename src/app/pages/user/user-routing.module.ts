import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayerComponent } from './layer/layer.component';

const routes: Routes = [
  {
    path: '',
    component: LayerComponent,
    children:[
      {
        path: 'Topic',
        loadChildren: () => import('../../pages/main-topic/main-topic.module').then(m => m.MainTopicModule),
      },
      {
        path: 'Buscar-receta',
        loadChildren: () => import('../../pages/search-recipe/search-recipe.module').then(m => m.SearchRecipeModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
