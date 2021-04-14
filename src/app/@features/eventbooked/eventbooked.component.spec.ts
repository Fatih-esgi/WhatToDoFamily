import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventbookedComponent } from './eventbooked.component';

describe('EventbookedComponent', () => {
  let component: EventbookedComponent;
  let fixture: ComponentFixture<EventbookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventbookedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventbookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
