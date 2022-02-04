import { TechniquesRecipeService } from './../../service/recipe/techniques-recipe.service';
import { TimesId } from 'src/app/models/times';
import { InstructionsService } from './../../service/recipe/instructions.service';
import { TechniquesRecipeId } from 'src/app/models/techniques-recipe';
import { InstructionsList } from './../../pages/search-recipe/recipe/recipe.component';
import { RecipeId } from 'src/app/models/recipe';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './../../models/recipe';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { IngredientsRecipe, IngredientsRecipeId } from './../../models/ingredients-recipe';
import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/service/recipe/category.service';
import { IngredientService } from 'src/app/service/recipe/ingredient.service';
import { IngredientsService } from 'src/app/service/recipe/ingredients.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree'
import { Packer } from "docx";
import * as fs from 'file-saver';
import * as fs1 from "fs";

import { DocumentCreator } from "./doc-generator";
import { Document, Paragraph, TextRun, HeadingLevel, ImageRun } from "docx";
import { InstructionsId } from 'src/app/models/instructions';
import { TimesService } from 'src/app/service/recipe/times.service';


export interface Nodes {
  title: any,
  key?: any,
  children?: any[]
  isLeaf?: any
}
export interface RecipeImpres {
  title?: string,
  times?: any[],

}
@Component({
  selector: 'app-cascade-multiple',
  templateUrl: './cascade-multiple.component.html',
  styleUrls: ['./cascade-multiple.component.sass']
})
export class CascadeMultipleComponent implements OnInit {
  recipes: any[] = []
  recipesAux: any[] = []
  value: string[] = [];
  testRecipe: RecipeId = {}
  testRecipeIngredients: IngredientsRecipeId[] = []
  testRecipeIInstructions: InstructionsId[] = []
  testRecipeTechiniques: TechniquesRecipeId[] = []
  testRecipeTimes: TimesId[] = []
  logo1?: ArrayBuffer
  logo2?: ArrayBuffer
  nodes: NzTreeNodeOptions[] = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  constructor(
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private ingredientsService: IngredientsService,
    private recipeService: RecipeService,
    private instructionsService: InstructionsService,
    private techniquesRecipeService: TechniquesRecipeService,
    private timesService: TimesService,
    private http: HttpClient
  ) { }




  async fetchNodes() {
    this.nodes = []
    this.categoryService.getAllCategorys().subscribe(
      async categorys => {
        for (const category of categorys) {
          var auxNode: NzTreeNodeOptions = {
            title: category.name!,
            key: category.id
          }
          const ingredients = await new Promise<any[]>((resolve, reject) => {
            this.ingredientService.getIngredientsByCategory(category.id).subscribe(
              ingredient => {
                var auxSubNodes: NzTreeNodeOptions[] = []
                ingredient.forEach(x => {
                  var auxSubNode: NzTreeNodeOptions = {
                    title: x.name!,
                    key: x.id!
                  }
                  auxSubNodes.push(auxSubNode)
                })
                resolve(auxSubNodes);
              }
            )
          })
          auxNode.children = ingredients
          this.nodes.push(auxNode)
          console.log(auxNode)
        }
      }
    )
  }

  async fetchRecipes(ingredients: string[]) {
    this.recipes = []
    var filterRecipe = this.recipesAux
    for (const ingredient of ingredients) {
      this.recipes = []
      console.log(filterRecipe)
      const auxRecipe = await new Promise<any[]>((resolve, reject) => {
        this.ingredientsService.getIngredientsByIngredient(ingredient).subscribe(
          result => {
            result.forEach(i => {
              const predicade = (element: any) => element.id === i.recipe
              if (filterRecipe.some(predicade) && !this.recipes.some(predicade)) {
                const recipe = filterRecipe.find(element => element.id === i.recipe)
                this.recipes.push(recipe)
              }
            })
            filterRecipe = this.recipes
            resolve(filterRecipe)
          }
        )
      })
    }

  }

  public download(): void {
    const documentCreator = new DocumentCreator();
    this.http.get(this.testRecipe.image!, { responseType: 'blob' }).subscribe(
      result => {
        const bufferPromise = result.arrayBuffer();
        bufferPromise.then(
          bufferP => {
            const doc = documentCreator.create(this.testRecipe, bufferP, this.testRecipeIngredients,this.testRecipeIInstructions, this.testRecipeTimes, this.logo1,this.logo2);

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

  onChange($event: string[]): void {
    if ($event.length > 0) {
      this.fetchRecipes($event)
    } else {
      this.recipes = this.recipesAux
    }

  }

  ngOnInit(): void {
    this.recipeService.getAllrecipes().subscribe(
      result => {
        this.recipesAux = result
        this.recipes = this.recipesAux
        this.testRecipe = result[0]
        this.ingredientsService.getIngredientsByRecipe(this.testRecipe.id!).subscribe(
          ingredients=>{
            this.testRecipeIngredients=ingredients
          }
        )
        this.instructionsService.getInstructionByRecipe(this.testRecipe.id!).subscribe(
          instructions=>{
            this.testRecipeIInstructions=instructions
          }
        )
        this.timesService.getTimesByRecipe(this.testRecipe.id!).subscribe(
          times=>{
            this.testRecipeTimes=times
          }
        )
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
    this.fetchNodes()

  })
}
}
