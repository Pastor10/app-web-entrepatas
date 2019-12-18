import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasMonitorComponent } from './estadisticas-monitor.component';

describe('EstadisticasMonitorComponent', () => {
  let component: EstadisticasMonitorComponent;
  let fixture: ComponentFixture<EstadisticasMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
