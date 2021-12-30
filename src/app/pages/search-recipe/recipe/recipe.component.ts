import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass']
})
export class RecipeComponent implements OnInit {

  tecnicas = [
    {path: '../../../../assets/image 10.png'},
    {path: '../../../../assets/image 10.png'},
    {path: '../../../../assets/image 10.png'},
  ]

  tiempos =[
    {name:'Tiempo de Preparacion', time:10, medida_t:'minutos'},
    {name:'Tiempo de Preparacion', time:10, medida_t:'minutos'},
    {name:'Tiempo de Preparacion', time:10, medida_t:'minutos'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
