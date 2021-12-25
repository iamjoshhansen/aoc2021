import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day15Part2Component } from './day15-part2.component';

describe('Day15Part2Component', () => {
  let component: Day15Part2Component;
  let fixture: ComponentFixture<Day15Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day15Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day15Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
