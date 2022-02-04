import { TimesId } from './../../../models/times';
import { TechniquesRecipeId } from './../../../models/techniques-recipe';
import { IngredientsRecipeId } from './../../../models/ingredients-recipe';
import { HttpClient } from '@angular/common/http';
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

import { DocumentCreator } from "./doc-generator";
import { Packer } from "docx";
import * as fs from 'file-saver';


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

  logo1?:ArrayBuffer
  logo2?:ArrayBuffer


  recipes: RecipeInfo[] = []
  recipe: RecipeId={}
  testRecipeIngredients: IngredientsRecipeId[] = []
  testRecipeIInstructions: InstructionsId[] = []
  testRecipeTechiniques: TechniquesRecipeId[] = []
  testRecipeTimes: TimesId[] = []


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
    private http: HttpClient,
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
        this.testRecipeIngredients= result
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
        this.testRecipeIInstructions = result
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


  public download(): void {
    const documentCreator = new DocumentCreator();
    this.http.get(this.recipe.image!, { responseType: 'blob' }).subscribe(
      result => {
        const bufferPromise = result.arrayBuffer();
        bufferPromise.then(
          bufferP => {
            const doc = documentCreator.create(this.recipe, bufferP, this.testRecipeIngredients,this.testRecipeIInstructions, this.testRecipeTimes, this.logo1,this.logo2);

            Packer.toBlob(doc).then(buffer => {
              console.log(buffer);
              fs.saveAs(buffer, "example.docx");
              console.log("Document created successfully");
            });

          }
        );
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

    this.http.get('https://firebasestorage.googleapis.com/v0/b/gastroacademi.appspot.com/o/resources%2Fimagen_2022-02-03_170019.png?alt=media&token=4b4c67fc-5fa5-47e1-a9ee-0c09802b6824', { responseType: 'blob' }).subscribe(
          result => {
            const bufferPromise = result.arrayBuffer();
            bufferPromise.then(
              bufferP => {
                this.logo1 = bufferP
              })
        })
        this.http.get('https://firebasestorage.googleapis.com/v0/b/gastroacademi.appspot.com/o/resources%2Fmarca%20UTPL%202018-01.png?alt=media&token=ddd95ed8-ebc0-441d-888e-8d24a388b919', { responseType: 'blob' }).subscribe(
          result => {
            const bufferPromise = result.arrayBuffer();
            bufferPromise.then(
              bufferP => {
                this.logo2 = bufferP
              })
        })

    this.fetchTechniques();

  }


}
