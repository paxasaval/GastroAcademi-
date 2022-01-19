import { TimesService } from 'src/app/service/recipe/times.service';
import { InstructionsService } from './../../../../service/recipe/instructions.service';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from './../../../../service/recipe/recipe.service';
import { IngredientsRecipe } from './../../../../models/ingredients-recipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { TypeService } from 'src/app/service/recipe/type.service';
import { IngredientService } from 'src/app/service/recipe/ingredient.service';
import { Ingredients, IngredientsId } from 'src/app/models/ingredients';
import { MatDialog } from '@angular/material/dialog';
import { NewIngredientComponent } from '../../components/new-ingredient/new-ingredient.component';
import { Instructions, InstructionsId } from 'src/app/models/instructions';
import { Times, TimesId } from 'src/app/models/times';
import { IngredientsService } from 'src/app/service/recipe/ingredients.service';



@Component({
  selector: 'app-nuevo-test',
  templateUrl: './nuevo-test.component.html',
  styleUrls: ['./nuevo-test.component.sass']
})
export class NuevoTestComponent implements OnInit {

  img:any
  types:any[]=[]
  ingredientsCatalog:any[]=[]

  ingredients:IngredientsRecipe[] = []
  instructions:Instructions[] = []
  times:Times[] = []

  recipeForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    portions: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    dificulty: new FormControl('',[Validators.required])
  });

  qestions: any[] = [{}]
  tittle=''
  description=''

  constructor(
    private typesService: TypeService,
    private ingredientService: IngredientService,
    private ingredientsService: IngredientsService,
    private instructionsService: InstructionsService,
    private timesService: TimesService,
    private dialog: MatDialog,
    private recipeService: RecipeService
  ) { }

  addIngredient(){
    var otherIngredient: IngredientsRecipe = {}
    this.ingredients.push(otherIngredient)
  }

  addInstruction(){
    var otherInstruction: Instructions = {}
    var pos = this.instructions.length+1
    otherInstruction.position=pos
    this.instructions.push(otherInstruction)
  }

  addTimes(){
    var otherTime: Times ={}
    this.times.push(otherTime)
  }

  fetchTypes(){
    this.typesService.getAllTypes().subscribe(
      result=>{
        this.types=result
      }
    )
  }

  fetchIngredientsCatalog(){
    this.ingredientService.getAllIingredient().subscribe(
      result=>{
        this.ingredientsCatalog=result
      }
    )
  }

  submit(){
    const {name, portions, type, dificulty} = this.recipeForm.value;
    var newRecipe: Recipe={}
    newRecipe.name=name
    newRecipe.portions=portions
    newRecipe.type=type
    newRecipe.difficulty=dificulty
    this.recipeService.postRecipe(newRecipe).then(
      result=>{
        this.ingredients.forEach(i=>{
            i.recipe=result.id
            this.ingredientsService.postIngredients(i)
        })
        this.instructions.forEach(inst=>{
          inst.recipe=result.id
          this.instructionsService.postInstruction(inst)
        })
        this.times.forEach(time=>{
          time.recipe=result.id
          this.timesService.postTimes(time)
        })
      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewIngredientComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchIngredientsCatalog()
    });
  }

  onFileSelected(event: any) {
    this.img = event.target.files[0];

  }

  ngOnInit(): void {
    this.fetchTypes()
    this.fetchIngredientsCatalog()
  }

  get name(){
    return this.recipeForm.get('name')
  }

  get portions(){
    return this.recipeForm.get('portions')
  }
  get type(){
    return this.recipeForm.get('type')
  }
  get image(){
    return this.recipeForm.get('image')
  }
  get dificulty(){
    return this.recipeForm.get('dificulty')
  }
}
