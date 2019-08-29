import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAsistenciaRangoComponent } from './clientes-asistencia-rango.component';

describe('ClientesAsistenciaRangoComponent', () => {
  let component: ClientesAsistenciaRangoComponent;
  let fixture: ComponentFixture<ClientesAsistenciaRangoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesAsistenciaRangoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesAsistenciaRangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
