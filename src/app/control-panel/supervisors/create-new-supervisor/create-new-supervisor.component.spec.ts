import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSupervisorComponent } from './create-new-supervisor.component';

describe('CreateNewSupervisorComponent', () => {
  let component: CreateNewSupervisorComponent;
  let fixture: ComponentFixture<CreateNewSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewSupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
