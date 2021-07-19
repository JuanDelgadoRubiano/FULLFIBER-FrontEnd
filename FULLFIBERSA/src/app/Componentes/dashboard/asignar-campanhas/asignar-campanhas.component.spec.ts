import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCampanhasComponent } from './asignar-campanhas.component';

describe('AsignarCampanhasComponent', () => {
  let component: AsignarCampanhasComponent;
  let fixture: ComponentFixture<AsignarCampanhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarCampanhasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCampanhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
