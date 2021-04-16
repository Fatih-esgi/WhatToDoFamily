import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldeventComponent } from './oldevent.component';

describe('OldeventComponent', () => {
  let component: OldeventComponent;
  let fixture: ComponentFixture<OldeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldeventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
