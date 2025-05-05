import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgRatingPerBranchComponent } from './avg-rating-per-branch.component';

describe('AvgRatingPerBranchComponent', () => {
  let component: AvgRatingPerBranchComponent;
  let fixture: ComponentFixture<AvgRatingPerBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvgRatingPerBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgRatingPerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
