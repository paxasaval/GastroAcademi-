import { Component, Input, OnInit } from '@angular/core';
import { StaticResource } from 'src/app/models/staticResource';

@Component({
  selector: 'app-grid-resourses',
  templateUrl: './grid-resourses.component.html',
  styleUrls: ['./grid-resourses.component.sass']
})
export class GridResoursesComponent implements OnInit {

  @Input() name='';

  cards:StaticResource[] =[
    {img: '../../../../../assets/Rectangle 81.png', title:'lorem ipsum'},
    {img: '../../../../../assets/Rectangle 81.png', title:'lorem ipsum'},
    {img: '../../../../../assets/Rectangle 81.png', title:'lorem ipsum'},
    {img: '../../../../../assets/Rectangle 81.png', title:'lorem ipsum'},
    {img: '../../../../../assets/Rectangle 81.png', title:'lorem ipsum'},
    {img: '../../../../../assets/Rectangle 81.png', title:'lorem ipsum'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
