import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IngredientsService } from 'src/app/service/recipe/ingredients.service';
import { InstructionsService } from 'src/app/service/recipe/instructions.service';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { TimesService } from 'src/app/service/recipe/times.service';

export interface TimeList{
  name?: string;
  time?: number;
  medida_t?: string;
}

export interface IngredientsList{
  name?: string
  quantity?: number
  measure?: string
}

export interface InstructionsList{
  position?: number
  description?: string
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass']
})
export class RecipeComponent implements OnInit {
  recipeId = ""
  tecnicas = [
    { path: '../../../../assets/image 10.png' },
    { path: '../../../../assets/image 10.png' },
    { path: '../../../../assets/image 10.png' },
  ]

  times: TimeList[] = []

  ingredients: IngredientsList[] = []

  instructions: InstructionsList [] = []

  constructor(
    private recipeService: RecipeService,
    private timesService: TimesService,
    private ingredientsService: IngredientsService,
    private instructionsService: InstructionsService,
    private router: ActivatedRoute
  ) { }
  
  fetchIngredientsRecipe(){
    this.ingredientsService.getIngredientsByRecipe(this.recipeId).subscribe(
      result => {
        this.ingredients = []
        result.forEach(x => {
          var auxIngredients: IngredientsList = {}
          auxIngredients.name = x.name
          auxIngredients.quantity = x.quantity
          auxIngredients.measure = x.measure
          this.ingredients.push(auxIngredients)
        })
      }
    )
  }

  fetchInstructionsRecipe(){
    this.instructionsService.getInstructionByRecipe(this.recipeId).subscribe(
      result => {
        this.instructions = []
        result.forEach(x => {
          var auxInstructions: InstructionsList = {}
          auxInstructions.position = x.position
          auxInstructions.description = x.description
          this.instructions.push(auxInstructions)
          console.log(auxInstructions)
        })
      }
    )
  }

  fetchRTimesRecipe(){
    this.timesService.getTimesByRecipe(this.recipeId).subscribe(
      result => {
        this.times = []
        result.forEach(x => {
          var auxTimes: TimeList = {}
          auxTimes.name = x.name
          auxTimes.time = x.total
          auxTimes.medida_t = x.measure
          this.times.push(auxTimes)         
        })
      }
    )
  }


  ngOnInit(): void {
    this.router.params.subscribe((params:  Params) => {       this.recipeId = params["id"]   });
    this.fetchRTimesRecipe();
    this.fetchInstructionsRecipe();
    this.fetchIngredientsRecipe();
  }

}
