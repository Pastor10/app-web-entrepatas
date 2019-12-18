import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresoraMonitorComponent } from './impresora-monitor.component';

describe('ImpresoraMonitorComponent', () => {
  let component: ImpresoraMonitorComponent;
  let fixture: ComponentFixture<ImpresoraMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpresoraMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpresoraMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
