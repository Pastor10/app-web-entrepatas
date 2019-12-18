import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceUsuariosComponent } from './performance-usuarios.component';

describe('PerformanceUsuariosComponent', () => {
  let component: PerformanceUsuariosComponent;
  let fixture: ComponentFixture<PerformanceUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
