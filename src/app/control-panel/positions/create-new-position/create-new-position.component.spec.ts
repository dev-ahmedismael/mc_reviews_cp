import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPositionComponent } from './create-new-position.component';

describe('CreateNewPositionComponent', () => {
  let component: CreateNewPositionComponent;
  let fixture: ComponentFixture<CreateNewPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewPositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
