import { Component, OnInit } from '@angular/core';

export interface Option{
  id?:number,
  name?: string,
  check?: boolean,
  option?: string
}

@Component({
  selector: 'app-pregunta-opcional',
  templateUrl: './pregunta-opcional.component.html',
  styleUrls: ['./pregunta-opcional.component.sass']
})
export class PreguntaOpcionalComponent implements OnInit {

  enunciado=''
  checked = false;
  options: Option[]=[{
    id:0,
    name:``
  }]

  deleteOption(option: Option){
    this.options=this.options.filter(o=>o!=option)
  }

  addOption(){
    var i = this.options.length
    var option:Option = {
      id:i,
      name:``
    }
    this.options.push(option)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
