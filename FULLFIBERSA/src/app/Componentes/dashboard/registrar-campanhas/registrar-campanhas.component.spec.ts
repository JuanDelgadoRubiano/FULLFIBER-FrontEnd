import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCampanhasComponent } from './registrar-campanhas.component';

describe('RegistrarCampanhasComponent', () => {
  let component: RegistrarCampanhasComponent;
  let fixture: ComponentFixture<RegistrarCampanhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarCampanhasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCampanhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
