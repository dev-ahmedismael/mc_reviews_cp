import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReviewsByBranchComponent } from './daily-reviews-by-branch.component';

describe('DailyReviewsByBranchComponent', () => {
  let component: DailyReviewsByBranchComponent;
  let fixture: ComponentFixture<DailyReviewsByBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyReviewsByBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyReviewsByBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
