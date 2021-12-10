import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day08Component } from './day08.component';

describe('Day08Component', () => {
  let component: Day08Component;
  let fixture: ComponentFixture<Day08Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day08Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
