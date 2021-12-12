import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day11Part2Component } from './day11-part2.component';

describe('Day11Part2Component', () => {
  let component: Day11Part2Component;
  let fixture: ComponentFixture<Day11Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day11Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day11Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
