import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridResoursesComponent } from './grid-resourses.component';

describe('GridResoursesComponent', () => {
  let component: GridResoursesComponent;
  let fixture: ComponentFixture<GridResoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridResoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridResoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
