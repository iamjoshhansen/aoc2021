import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day07Part2Component } from './day07-part2.component';

describe('Day07Part2Component', () => {
  let component: Day07Part2Component;
  let fixture: ComponentFixture<Day07Part2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day07Part2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day07Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
