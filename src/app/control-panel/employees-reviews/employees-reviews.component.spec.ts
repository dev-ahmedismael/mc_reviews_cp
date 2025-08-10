import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesReviewsComponent } from './employees-reviews.component';

describe('EmployeesReviewsComponent', () => {
  let component: EmployeesReviewsComponent;
  let fixture: ComponentFixture<EmployeesReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
