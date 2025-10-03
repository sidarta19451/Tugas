import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisimisiComponent } from './visimisi.component';

describe('VisimisiComponent', () => {
  let component: VisimisiComponent;
  let fixture: ComponentFixture<VisimisiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisimisiComponent]
    });
    fixture = TestBed.createComponent(VisimisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
