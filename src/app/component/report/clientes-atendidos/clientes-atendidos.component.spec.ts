import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAtendidosComponent } from './clientes-atendidos.component';

describe('ClientesAtendidosComponent', () => {
  let component: ClientesAtendidosComponent;
  let fixture: ComponentFixture<ClientesAtendidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesAtendidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesAtendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
