import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgRatingPerMonthComponent } from './avg-rating-per-month.component';

describe('AvgRatingPerMonthComponent', () => {
  let component: AvgRatingPerMonthComponent;
  let fixture: ComponentFixture<AvgRatingPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvgRatingPerMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgRatingPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
