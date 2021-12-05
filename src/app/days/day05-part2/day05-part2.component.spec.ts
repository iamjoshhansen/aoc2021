import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day05Part2Component } from './day05-part2.component';

describe('Day05Part2Component', () => {
  let component: Day05Part2Component;
  let fixture: ComponentFixture<Day05Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day05Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day05Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
