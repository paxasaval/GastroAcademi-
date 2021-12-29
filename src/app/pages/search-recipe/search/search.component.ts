import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Ingredientes {
  name: string;
}
export interface Cooccion {
  name: string;
}
export interface Conservacion {
  name: string;
}
export interface Tecnicas {
  name: string;
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
  options: Ingredientes[] = [{name: 'Cebolla'}, {name: 'Tomate'}, {name: 'Carne de res'}];
  options_1: Cooccion[] = [{name: 'Cooccion1'}, {name: 'Cooccion2'}, {name: 'Cooccion de res'}];
  options_2: Conservacion[] = [{name: 'Conservacion1'}, {name: 'Conservacion2'}, {name: 'Conservacion3 de res'}];
  options_3: Tecnicas[] = [{name: 'Tecnicas1'}, {name: 'Tecnicas2'}, {name: 'Tecnicas3 de res'}];
  filteredOptions?: Observable<Ingredientes[]>;
  filteredOptions_1?: Observable<Cooccion[]>;
  filteredOptions_2?: Observable<Conservacion[]>;
  filteredOptions_3?: Observable<Tecnicas[]>;

  cards: any[] = [1,2,3,4,5,6,7,8]
  constructor() { }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
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

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  //
  displayFn_1(user: Cooccion): string {
    return user && user.name ? user.name : '';
  }

  private _filter_1(name: string): Cooccion[] {
    const filterValue = name.toLowerCase();

    return this.options_1.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  //
  //
  displayFn_2(user: Conservacion): string {
    return user && user.name ? user.name : '';
  }

  private _filter_2(name: string): Conservacion[] {
    const filterValue = name.toLowerCase();

    return this.options_2.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  //
  //
  displayFn_3(user: Tecnicas): string {
    return user && user.name ? user.name : '';
  }

  private _filter_3(name: string): Tecnicas[] {
    const filterValue = name.toLowerCase();

    return this.options_3.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  //

}
