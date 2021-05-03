import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrarViewComponent } from './calendrar-view.component';

describe('CalendrarViewComponent', () => {
  let component: CalendrarViewComponent;
  let fixture: ComponentFixture<CalendrarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrarViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
