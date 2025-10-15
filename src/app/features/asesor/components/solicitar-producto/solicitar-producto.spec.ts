import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarProducto } from './solicitar-producto';

describe('SolicitarProducto', () => {
  let component: SolicitarProducto;
  let fixture: ComponentFixture<SolicitarProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
