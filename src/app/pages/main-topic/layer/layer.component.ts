import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.sass']
})
export class LayerComponent implements OnInit {

  name=''

  constructor(private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data=> {
      this.name=data['name']
    })
  }

}
