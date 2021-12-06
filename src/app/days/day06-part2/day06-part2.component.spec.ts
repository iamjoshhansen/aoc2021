import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day06Part2Component } from './day06-part2.component';

describe('Day06Part2Component', () => {
  let component: Day06Part2Component;
  let fixture: ComponentFixture<Day06Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day06Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day06Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
