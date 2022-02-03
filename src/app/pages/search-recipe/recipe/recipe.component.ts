import { RecipeId } from 'src/app/models/recipe';
import { AfterViewInit, Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Instructions, InstructionsId } from 'src/app/models/instructions';
import { IngredientsService } from 'src/app/service/recipe/ingredients.service';
import { InstructionsService } from 'src/app/service/recipe/instructions.service';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { TimesService } from 'src/app/service/recipe/times.service';
import { Ingredients, IngredientsId } from 'src/app/models/ingredients';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TechniquesRecipe } from 'src/app/models/techniques-recipe';
import { TechniquesRecipeService } from 'src/app/service/recipe/techniques-recipe.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Techniques } from 'src/app/models/techniques';

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
  techniques: TechniquesRecipe[] = []

  recipes: RecipeInfo[] = []
  recipe: RecipeId={}
  times: TimeList[] = []

  timer:number=0


  ingredients: IngredientsList[] = []

  instructions: InstructionsList [] = []
  dataSource=new MatTableDataSource<any>([])
  dataSource1=new MatTableDataSource<any>([])
  displayedColumns: string[] = ['ingrediente', 'cantidad', 'medida'];
  displayedColumns2: string[] = ['posicion', 'descripcion'];

  auxTechnique: any [] = []

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  constructor(
    private recipeService: RecipeService,
    private timesService: TimesService,
    private techniquesRecipeService: TechniquesRecipeService,
    private ingredientsService: IngredientsService,
    private instructionsService: InstructionsService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
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
          auxIngredients.name = x.alias
          auxIngredients.quantity = x.quantity
          auxIngredients.measure = x.measure
          this.ingredients.push(auxIngredients)

        })
        this.dataSource.data=this.ingredients
      },
      err=>{
        console.log(err)
      },
      ()=>{
        console.log('completado')
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
        this.dataSource1.data=this.instructions

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

  loadTime(time:number, measure:string){
    if(measure === "Minutos"){
      this.timer = time * 60
    }
    if(measure === "Segundos"){
      this.timer = time
    }
    if(measure === "Horas"){
      this.timer = time * 3600
    }
    if(measure === "Dias"){
      this.timer = time * 86400
    }
    console.log(measure)
  }

  fetchTechniques(){
    this.techniquesRecipeService.getTechniquesRecipeByRecipe(this.recipeId).subscribe(
      technique => {
        this.techniques = technique
        this.techniques.forEach(t =>{
          var aux = t.technique?.resource!.replace('/watch?v=','/embed/')
          
          this.auxTechnique.push( this.sanitizer.bypassSecurityTrustResourceUrl(aux!))
          
        })
      }
    )
  }

  ngOnInit(): void {
    this.router.params.subscribe((params:  Params) => {       this.recipeId = params["id"]   });
    this.fetchRecipe();
    this.fetchRTimesRecipe();
    this.fetchInstructionsRecipe();
    this.fetchIngredientsRecipe();
    this.fetchTechniques();
  }


}
