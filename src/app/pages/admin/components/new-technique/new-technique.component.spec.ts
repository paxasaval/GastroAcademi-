import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTechniqueComponent } from './new-technique.component';

describe('NewTechniqueComponent', () => {
  let component: NewTechniqueComponent;
  let fixture: ComponentFixture<NewTechniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTechniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
