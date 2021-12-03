import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day02Part2Component } from './day02-part2.component';

describe('Day02Part2Component', () => {
  let component: Day02Part2Component;
  let fixture: ComponentFixture<Day02Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day02Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day02Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
