import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day12Part2Component } from './day12-part2.component';

describe('Day12Part2Component', () => {
  let component: Day12Part2Component;
  let fixture: ComponentFixture<Day12Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day12Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day12Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
