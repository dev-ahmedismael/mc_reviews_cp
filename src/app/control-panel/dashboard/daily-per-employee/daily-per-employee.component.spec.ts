import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPerEmployeeComponent } from './daily-per-employee.component';

describe('DailyPerEmployeeComponent', () => {
  let component: DailyPerEmployeeComponent;
  let fixture: ComponentFixture<DailyPerEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyPerEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyPerEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
