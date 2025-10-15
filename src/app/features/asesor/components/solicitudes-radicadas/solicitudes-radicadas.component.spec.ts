import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRadicadas } from './solicitudes-radicadas.component';

describe('SolicitudesRadicadas', () => {
  let component: SolicitudesRadicadas;
  let fixture: ComponentFixture<SolicitudesRadicadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesRadicadas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesRadicadas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
