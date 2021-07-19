import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificandoClienteCampanhaComponent } from './modificando-cliente-campanha.component';

describe('ModificandoClienteCampanhaComponent', () => {
  let component: ModificandoClienteCampanhaComponent;
  let fixture: ComponentFixture<ModificandoClienteCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificandoClienteCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificandoClienteCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
