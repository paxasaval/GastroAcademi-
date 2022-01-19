import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/recipe/category.service';
import { IngredientService } from 'src/app/service/recipe/ingredient.service';
import { Ingredients } from 'src/app/models/ingredients';
import { MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.sass']
})
export class NewIngredientComponent implements OnInit {

  newIngredientForm=new FormGroup({
    category: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required])
  })

  categorys:any=[]

  constructor(
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    public dialogRef: MatDialogRef<NewIngredientComponent>,
    private toast: HotToastService,
  ) { }

  fetchCategorys(){
    this.categoryService.getAllCategorys().subscribe(
      result=>{
        this.categorys=result
      }
    )
  }

  submit(){
    if(!this.newIngredientForm.valid){
      return
    }
    const {category, name} = this.newIngredientForm.value;
    var newIngredient:  Ingredients={}
    newIngredient.category = category
    newIngredient.name= name

    this.ingredientService.postIngredient(newIngredient).then(result=>{
      this.toast.observe({
        success: 'Registrado nuevo ingrediente con exito',
        loading: 'Registrando ingrediente',
        error: 'Ha ocurrido un error'
      })
    })
    this.dialogRef.close()

  }

  ngOnInit(): void {
    this.fetchCategorys()
  }

  get category(){
    return this.newIngredientForm.get('category')
  }

  get name(){
    return this.newIngredientForm.get('name')
  }
}
