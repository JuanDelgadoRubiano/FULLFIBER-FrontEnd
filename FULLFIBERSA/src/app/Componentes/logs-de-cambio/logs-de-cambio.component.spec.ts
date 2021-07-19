import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDeCambioComponent } from './logs-de-cambio.component';

describe('LogsDeCambioComponent', () => {
  let component: LogsDeCambioComponent;
  let fixture: ComponentFixture<LogsDeCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsDeCambioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsDeCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
