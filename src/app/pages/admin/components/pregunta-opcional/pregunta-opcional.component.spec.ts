import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaOpcionalComponent } from './pregunta-opcional.component';

describe('PreguntaOpcionalComponent', () => {
  let component: PreguntaOpcionalComponent;
  let fixture: ComponentFixture<PreguntaOpcionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntaOpcionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaOpcionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
