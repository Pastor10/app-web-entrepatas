import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionPerfilMonitorComponent } from './configuracion-perfil-monitor.component';

describe('ConfiguracionPerfilMonitorComponent', () => {
  let component: ConfiguracionPerfilMonitorComponent;
  let fixture: ComponentFixture<ConfiguracionPerfilMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionPerfilMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionPerfilMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
