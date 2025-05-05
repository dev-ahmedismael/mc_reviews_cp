import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDistributionComponent } from './review-distribution.component';

describe('ReviewDistributionComponent', () => {
  let component: ReviewDistributionComponent;
  let fixture: ComponentFixture<ReviewDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewDistributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
