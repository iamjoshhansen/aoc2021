import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day13Part2Component } from './day13-part2.component';

describe('Day13Part2Component', () => {
  let component: Day13Part2Component;
  let fixture: ComponentFixture<Day13Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day13Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day13Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
