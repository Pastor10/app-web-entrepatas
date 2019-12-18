import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosMonitorComponent } from './parametros-monitor.component';

describe('ParametrosMonitorComponent', () => {
  let component: ParametrosMonitorComponent;
  let fixture: ComponentFixture<ParametrosMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
