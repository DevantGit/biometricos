import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAsistenciaComponent } from './clientes-asistencia.component';

describe('ClientesAsistenciaComponent', () => {
  let component: ClientesAsistenciaComponent;
  let fixture: ComponentFixture<ClientesAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
