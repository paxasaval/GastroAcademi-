import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTestComponent } from './nuevo-test.component';

describe('NuevoTestComponent', () => {
  let component: NuevoTestComponent;
  let fixture: ComponentFixture<NuevoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
