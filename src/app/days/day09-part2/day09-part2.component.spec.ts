import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day09Part2Component } from './day09-part2.component';

describe('Day09Part2Component', () => {
  let component: Day09Part2Component;
  let fixture: ComponentFixture<Day09Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day09Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day09Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
