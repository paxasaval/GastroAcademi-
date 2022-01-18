import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { iif, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { IngredientsService } from 'src/app/service/recipe/ingredients.service';
import { Ingredients } from 'src/app/models/ingredients';

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

  cards1?: any[]
  cards: Card[] =[]
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private recipeService: RecipeService,
    private ingredientsService: IngredientsService
  ) {
    iconRegistry.addSvgIcon('ingredientes', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/image 2.svg'))
    iconRegistry.addSvgIcon('coccion', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/image 3.svg'))
    iconRegistry.addSvgIcon('coservacion', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/image 5.svg'))
    iconRegistry.addSvgIcon('tecnicas', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/image 6.svg'))
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
      }
    )
  }

  fetchIngredients(){
    this.ingredientsService.getAllIngredients().subscribe(result=>{
      this.options = []
      result.forEach(x=>{
        var auxIngrediente: Ingredientes ={}
        var name = ''
        
        auxIngrediente.name = name
        const nuevo_ingrediente = (element:Ingredientes)=>element.name===x.name
        if(!this.options.some(nuevo_ingrediente)){
          this.options.push(auxIngrediente)
          console.log(auxIngrediente)
        }
      })
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filter(name) : this.options.slice())),
      );
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cards1 = this.cards.filter(card => card.name!.toLowerCase().includes(filterValue))

  }

  ngOnInit(): void {
    this.fetchIngredients()
    this.fetchRecipes()
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
    this.cards1 = this.cards
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
