import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrabWalkComponent } from './crab-walk.component';

describe('CrabWalkComponent', () => {
  let component: CrabWalkComponent;
  let fixture: ComponentFixture<CrabWalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrabWalkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrabWalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
