import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day14Part2Component } from './day14-part2.component';

describe('Day14Part2Component', () => {
  let component: Day14Part2Component;
  let fixture: ComponentFixture<Day14Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day14Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day14Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
