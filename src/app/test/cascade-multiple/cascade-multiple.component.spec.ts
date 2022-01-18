import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CascadeMultipleComponent } from './cascade-multiple.component';

describe('CascadeMultipleComponent', () => {
  let component: CascadeMultipleComponent;
  let fixture: ComponentFixture<CascadeMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CascadeMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CascadeMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
