import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day08Part2Component } from './day08-part2.component';

describe('Day08Part2Component', () => {
  let component: Day08Part2Component;
  let fixture: ComponentFixture<Day08Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day08Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day08Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
