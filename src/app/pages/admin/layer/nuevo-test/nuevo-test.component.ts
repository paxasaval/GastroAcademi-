import { startWith } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
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
import { Observable, Subscription, map } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { HotToastService } from '@ngneat/hot-toast';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-nuevo-test',
  templateUrl: './nuevo-test.component.html',
  styleUrls: ['./nuevo-test.component.sass']
})
export class NuevoTestComponent implements OnInit {

  img?:File
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

  myControl = new FormControl();
  options: Ingredients[] = [];
  filteredOptions?: Observable<Ingredients[]>;


  qestions: any[] = [{}]
  tittle=''
  description=''

  observer: Subscription[] =[]

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private typesService: TypeService,
    private ingredientService: IngredientService,
    private ingredientsService: IngredientsService,
    private instructionsService: InstructionsService,
    private timesService: TimesService,
    private dialog: MatDialog,
    private recipeService: RecipeService,
    private toast: HotToastService,
  ) {
    iconRegistry.addSvgIcon('ingredientes', sanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/image 2.svg'))
   }

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
    const load = this.toast.loading("Cargando...")
    const {name, portions, type, dificulty} = this.recipeForm.value;
    var newRecipe: Recipe={}
    newRecipe.name=name
    newRecipe.portions=portions
    newRecipe.type=type
    newRecipe.difficulty=dificulty
    this.recipeService.onUploadImage(this.img!).then(
      img=>{
        img.ref.getDownloadURL().then(
          path=>{
            newRecipe.image=path
            this.recipeService.postRecipe(newRecipe).then(
              result=>{
                this.ingredients.forEach(i=>{
                    i.recipe=result.id
                    var aux=i.ingredient as IngredientsId
                    i.ingredient=aux.id
                    if(i.alias===undefined){
                      i.alias = aux.name
                    }
                    this.ingredientsService.postIngredients(i)
                })
                this.instructions.forEach(inst=>{
                  inst.recipe=result.id
                  this.instructionsService.postInstruction(inst)
                })
                this.times.forEach(async time=>{
                  time.recipe=result.id
                  if(this.times.indexOf(time)===this.times.length-1){
                    await this.timesService.postTimes(time).then(
                      result=>{
                        load.close()
                        Swal.fire({
                          icon:'success',
                          title: 'Receta creada con exito',
                        })
                      }
                    )
                  }else{
                    this.timesService.postTimes(time)
                  }
                })

              }
            )
          }
        )

      }
    )

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewIngredientComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onFileSelected(event: any) {
    this.img = event.target.files[0];

  }

  ngOnInit(): void {
    this.fetchTypes()
    this.fetchIngredientsCatalog()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(ingredient: Ingredients): string {
    return ingredient && ingredient.name ? ingredient.name : '';
  }

  private _filter(name: string): Ingredients[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name!.toLowerCase().includes(filterValue));
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
