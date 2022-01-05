import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-nuevo-test',
  templateUrl: './nuevo-test.component.html',
  styleUrls: ['./nuevo-test.component.sass']
})
export class NuevoTestComponent implements OnInit {

  qestions: any[] = [{}]
  tittle=''
  description=''

  constructor() { }

  addQuestion(){
    var pregunta = {
      name:'pregunta'
    }
    this.qestions.push(pregunta)
  }

  ngOnInit(): void {
  }

}
