import { CategoryService } from 'src/app/service/recipe/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { iif, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { IngredientsService } from 'src/app/service/recipe/ingredients.service';
import { Ingredients } from 'src/app/models/ingredients';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { IngredientService } from 'src/app/service/recipe/ingredient.service';

export interface Ingredientes {
  name?: string;
}
export interface Cooccion {
  name?: string;
}
export interface Conservacion {
  name?: string;
}
export interface Tecnicas {
  name?: string;
}
export interface Card{
  name?: string
  image?: string
  path?: string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  myControl = new FormControl();
  myControl_1 = new FormControl();
  myControl_2 = new FormControl();
  myControl_3 = new FormControl();
  options: Ingredientes[] = [];
  options_1: Cooccion[] = [{ name: 'Cooccion1' }, { name: 'Cooccion2' }, { name: 'Cooccion de res' }];
  options_2: Conservacion[] = [{ name: 'Conservacion1' }, { name: 'Conservacion2' }, { name: 'Conservacion3 de res' }];
  options_3: Tecnicas[] = [{ name: 'Tecnicas1' }, { name: 'Tecnicas2' }, { name: 'Tecnicas3 de res' }];
  filteredOptions?: Observable<Ingredientes[]>;
  filteredOptions_1?: Observable<Cooccion[]>;
  filteredOptions_2?: Observable<Conservacion[]>;
  filteredOptions_3?: Observable<Tecnicas[]>;
  nodes: NzTreeNodeOptions[]=[]
  cards1?: any[]
  cards: Card[] =[]
  value: string[] = [];

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private recipeService: RecipeService,
    private ingredientsService: IngredientsService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
  ) {
    iconRegistry.addSvgIcon('ingredientes', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/image 2.svg'))
    iconRegistry.addSvgIcon('coccion', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/image 3.svg'))
    iconRegistry.addSvgIcon('coservacion', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/image 5.svg'))
    iconRegistry.addSvgIcon('tecnicas', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/image 6.svg'))
  }

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

  async fetchCards(ingredients: string[]) {
    this.cards = []
    var filterRecipe = this.cards1
    for (const ingredient of ingredients) {
      this.cards = []
      console.log(filterRecipe)
      const auxRecipe = await new Promise<any[]>((resolve, reject) => {
        this.ingredientsService.getIngredientsByIngredient(ingredient).subscribe(
          result => {
            result.forEach(i => {
              const predicade = (element: any) => element.path === i.recipe
              if (filterRecipe!.some(predicade) && !this.cards.some(predicade)) {
                const recipe = filterRecipe!.find(element => element.path === i.recipe)
                this.cards.push(recipe)
              }
            })
            filterRecipe = this.cards
            resolve(filterRecipe)
          }
        )
      })
    }

  }

  fetchRecipes(){

    this.recipeService.getAllrecipes().subscribe(
      result=>{
        console.log(result)
        this.cards=[]
        result.forEach(x=>{
          var auxRecipe:Card ={}
          auxRecipe.name=x.name
          auxRecipe.image=x.image
          auxRecipe.path=x.id
          this.cards.push(auxRecipe)
        })
        this.cards1=this.cards
      }
    )
  }

  onChange($event: string[]): void {
    if ($event.length > 0) {
      this.fetchCards($event)
    } else {
      this.cards = this.cards1!
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.cards = this.cards1!.filter(card => card.name!.toLowerCase().includes(filterValue))
  }

  ngOnInit(): void {
    this.fetchRecipes()
    this.fetchNodes()

    this.filteredOptions_1 = this.myControl_1.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter_1(name) : this.options_1.slice())),
    );
    this.filteredOptions_2 = this.myControl_2.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter_2(name) : this.options_2.slice())),
    );
    this.filteredOptions_3 = this.myControl_3.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter_3(name) : this.options_3.slice())),
    );

  }

  displayFn(user: Ingredientes): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Ingredientes[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name!.toLowerCase().includes(filterValue));
  }
  //
  displayFn_1(user: Cooccion): string {
    return user && user.name ? user.name : '';
  }

  private _filter_1(name: string): Cooccion[] {
    const filterValue = name.toLowerCase();

    return this.options_1.filter(option => option.name!.toLowerCase().includes(filterValue));
  }
  //
  //
  displayFn_2(user: Conservacion): string {
    return user && user.name ? user.name : '';
  }

  private _filter_2(name: string): Conservacion[] {
    const filterValue = name.toLowerCase();

    return this.options_2.filter(option => option.name!.toLowerCase().includes(filterValue));
  }
  //
  //
  displayFn_3(user: Tecnicas): string {
    return user && user.name ? user.name : '';
  }

  private _filter_3(name: string): Tecnicas[] {
    const filterValue = name.toLowerCase();

    return this.options_3.filter(option => option.name!.toLowerCase().includes(filterValue));
  }
  //

}
