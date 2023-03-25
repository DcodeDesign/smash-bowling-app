import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingLanesComponent } from './bowling-lanes.component';

describe('BowlingLanesComponent', () => {
  let component: BowlingLanesComponent;
  let fixture: ComponentFixture<BowlingLanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowlingLanesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlingLanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
