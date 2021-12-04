import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day04Part2Component } from './day04-part2.component';

describe('Day04Part2Component', () => {
  let component: Day04Part2Component;
  let fixture: ComponentFixture<Day04Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day04Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day04Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
