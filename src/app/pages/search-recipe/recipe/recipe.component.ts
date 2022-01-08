import { RecipeId } from 'src/app/models/recipe';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Instructions, InstructionsId } from 'src/app/models/instructions';
import { IngredientsService } from 'src/app/service/recipe/ingredients.service';
import { InstructionsService } from 'src/app/service/recipe/instructions.service';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { TimesService } from 'src/app/service/recipe/times.service';
import { Ingredients, IngredientsId } from 'src/app/models/ingredients';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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

export interface RecipeInfo{
  name?: string
  image?: string
}



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass']
})
export class RecipeComponent implements OnInit ,AfterViewInit{
  recipeId = ""
  tecnicas = [
    { path: '../../../../assets/image 10.png' },
    { path: '../../../../assets/image 10.png' },
    { path: '../../../../assets/image 10.png' },
  ]

  recipes: RecipeInfo[] = []
  recipe: RecipeId={}
  times: TimeList[] = []

  timer:number=0


  ingredients: IngredientsList[] = []

  instructions: InstructionsList [] = []
  dataSource=new MatTableDataSource<any>([])
  displayedColumns: string[] = ['ingrediente', 'cantidad', 'medida'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  constructor(
    private recipeService: RecipeService,
    private timesService: TimesService,
    private ingredientsService: IngredientsService,
    private instructionsService: InstructionsService,
    private router: ActivatedRoute
  ) { }

  fetchRecipe(){
    this.recipeService.getRecipeById(this.recipeId).subscribe(
      result => {
        this.recipe=result
      }
    )
  }

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
        this.dataSource.data=this.ingredients
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
        })
        var aux = this.instructions.slice()
        aux.forEach(x=>{
          this.instructions[x.position!-1]=x
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

  startTimer(){

  }
  endTimer(){

  }


  ngOnInit(): void {
    this.router.params.subscribe((params:  Params) => {       this.recipeId = params["id"]   });
    this.fetchRecipe();
    this.fetchRTimesRecipe();
    this.fetchInstructionsRecipe();
    this.fetchIngredientsRecipe();
  }

}
