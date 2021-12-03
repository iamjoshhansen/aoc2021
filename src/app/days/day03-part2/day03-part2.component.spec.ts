import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day03Part2Component } from './day03-part2.component';

describe('Day03Part2Component', () => {
  let component: Day03Part2Component;
  let fixture: ComponentFixture<Day03Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day03Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day03Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
