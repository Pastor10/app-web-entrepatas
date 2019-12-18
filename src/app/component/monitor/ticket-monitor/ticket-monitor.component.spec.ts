import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMonitorComponent } from './ticket-monitor.component';

describe('TicketMonitorComponent', () => {
  let component: TicketMonitorComponent;
  let fixture: ComponentFixture<TicketMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
