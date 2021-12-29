import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRecipeRoutingModule } from './search-recipe-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchRecipeRoutingModule,
    MaterialModule
  ]
})
export class SearchRecipeModule { }
