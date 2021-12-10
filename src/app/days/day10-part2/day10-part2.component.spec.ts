import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day10Part2Component } from './day10-part2.component';

describe('Day10Part2Component', () => {
  let component: Day10Part2Component;
  let fixture: ComponentFixture<Day10Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day10Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day10Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
