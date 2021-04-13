import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastvisitedComponent } from './lastvisited.component';

describe('LastvisitedComponent', () => {
  let component: LastvisitedComponent;
  let fixture: ComponentFixture<LastvisitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastvisitedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastvisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
