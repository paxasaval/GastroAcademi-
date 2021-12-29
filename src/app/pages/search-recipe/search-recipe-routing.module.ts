import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:'',
    component: SearchComponent
  },
  {
    path: 'Receta/:id',
    component: RecipeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRecipeRoutingModule { }
