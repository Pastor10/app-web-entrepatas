import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanillaMonitorComponent } from './ventanilla-monitor.component';

describe('VentanillaMonitorComponent', () => {
  let component: VentanillaMonitorComponent;
  let fixture: ComponentFixture<VentanillaMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentanillaMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanillaMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
