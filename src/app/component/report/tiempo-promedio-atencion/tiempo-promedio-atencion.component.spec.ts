import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoPromedioAtencionComponent } from './tiempo-promedio-atencion.component';

describe('TiempoPromedioAtencionComponent', () => {
  let component: TiempoPromedioAtencionComponent;
  let fixture: ComponentFixture<TiempoPromedioAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiempoPromedioAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoPromedioAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
