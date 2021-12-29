import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Topic',
    loadChildren: () => import('./pages/main-topic/main-topic.module').then(m => m.MainTopicModule),
  },
  {
    path: 'Buscar-receta',
    loadChildren: () => import('./pages/search-recipe/search-recipe.module').then(m => m.SearchRecipeModule),
  },
  {
    path: 'Receta',
    loadChildren: () => import('./pages/recipe/recipe.module').then(m => m.RecipeModule),
  },
  {
    path: 'Admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
