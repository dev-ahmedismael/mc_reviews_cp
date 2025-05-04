import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewNewsComponent } from './create-new-news.component';

describe('CreateNewNewsComponent', () => {
  let component: CreateNewNewsComponent;
  let fixture: ComponentFixture<CreateNewNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
