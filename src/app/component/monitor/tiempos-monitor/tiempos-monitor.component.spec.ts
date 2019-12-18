import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiemposMonitorComponent } from './tiempos-monitor.component';

describe('TiemposMonitorComponent', () => {
  let component: TiemposMonitorComponent;
  let fixture: ComponentFixture<TiemposMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiemposMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiemposMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
