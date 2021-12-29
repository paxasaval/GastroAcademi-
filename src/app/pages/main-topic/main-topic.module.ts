import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainTopicRoutingModule } from './main-topic-routing.module';
import { LayerComponent } from './layer/layer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { GridResoursesComponent } from './components/grid-resourses/grid-resourses.component';


@NgModule({
  declarations: [
    LayerComponent,
    SideBarComponent,
    GridResoursesComponent
  ],
  imports: [
    CommonModule,
    MainTopicRoutingModule
  ]
})
export class MainTopicModule { }
