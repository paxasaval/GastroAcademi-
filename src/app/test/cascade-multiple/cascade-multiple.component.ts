import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { IngredientsRecipe } from './../../models/ingredients-recipe';
import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/service/recipe/category.service';
import { IngredientService } from 'src/app/service/recipe/ingredient.service';
import { IngredientsService } from 'src/app/service/recipe/ingredients.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree'
export interface Nodes {
  title: any,
  key?: any,
  children?: any[]
  isLeaf?: any
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
    private recipeService: RecipeService
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
      }
    )
    this.fetchNodes()
  }

}
