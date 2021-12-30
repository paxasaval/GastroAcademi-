import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass']
})
export class RecipeCardComponent implements OnInit {
  @Input() card:any
  constructor(private router:Router) { }

  openRecipe(){
    this.router.navigate([`Buscar-receta/Receta/${this.card.path}`])
  }

  ngOnInit(): void {
  }


}
