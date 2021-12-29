import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.sass']
})
export class LayerComponent implements OnInit {

  name='';
  imgRoute='';
  constructor(private activatedroute:ActivatedRoute) { }

  chooseimage(){
    if(this.name==='Tecnicas Culinarias'){
      this.imgRoute='./../../../../assets/Rectangle 81.png'
    }
    if(this.name==='Meteodos de Coocion'){
      this.imgRoute='./../../../../assets/Rectangle 81 (1).png'
    }
    if(this.name==='Metodos de Conservacion'){
      this.imgRoute='./../../../../assets/Rectangle 81 (2).png'
    }
  }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data=> {
      this.name=data['name']
      this.chooseimage()
    })
  }

}
