import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day01Part2Component } from './day01-part2.component';

describe('Day01Part2Component', () => {
  let component: Day01Part2Component;
  let fixture: ComponentFixture<Day01Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day01Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day01Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
