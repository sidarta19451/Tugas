import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleCalculatorComponent } from './rectangle-calculator.component';

describe('RectangleCalculatorComponent', () => {
  let component: RectangleCalculatorComponent;
  let fixture: ComponentFixture<RectangleCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RectangleCalculatorComponent]
    });
    fixture = TestBed.createComponent(RectangleCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
