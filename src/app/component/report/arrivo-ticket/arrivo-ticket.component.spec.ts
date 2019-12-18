import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivoTicketComponent } from './arrivo-ticket.component';

describe('ArrivoTicketComponent', () => {
  let component: ArrivoTicketComponent;
  let fixture: ComponentFixture<ArrivoTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivoTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivoTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
