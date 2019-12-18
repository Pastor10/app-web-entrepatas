import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmasMonitorComponent } from './alarmas-monitor.component';

describe('AlarmasMonitorComponent', () => {
  let component: AlarmasMonitorComponent;
  let fixture: ComponentFixture<AlarmasMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmasMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmasMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
