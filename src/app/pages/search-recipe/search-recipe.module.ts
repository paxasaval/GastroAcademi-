import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRecipeRoutingModule } from './search-recipe-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SearchComponent } from './search/search.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';


@NgModule({
  declarations: [
    SearchComponent,
    RecipeComponent,
    RecipeCardComponent
  ],
  imports: [
    CommonModule,
    SearchRecipeRoutingModule,
    MaterialModule
  ]
})
export class SearchRecipeModule { }
