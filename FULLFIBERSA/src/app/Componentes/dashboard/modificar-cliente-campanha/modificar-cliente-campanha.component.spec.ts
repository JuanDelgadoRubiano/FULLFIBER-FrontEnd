import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarClienteCampanhaComponent } from './modificar-cliente-campanha.component';

describe('ModificarClienteCampanhaComponent', () => {
  let component: ModificarClienteCampanhaComponent;
  let fixture: ComponentFixture<ModificarClienteCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarClienteCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarClienteCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
