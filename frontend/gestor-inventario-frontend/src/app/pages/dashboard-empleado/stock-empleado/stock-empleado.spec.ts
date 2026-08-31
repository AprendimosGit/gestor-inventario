import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEmpleado } from './stock-empleado';

describe('StockEmpleado', () => {
  let component: StockEmpleado;
  let fixture: ComponentFixture<StockEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockEmpleado],
    }).compileComponents();

    fixture = TestBed.createComponent(StockEmpleado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
