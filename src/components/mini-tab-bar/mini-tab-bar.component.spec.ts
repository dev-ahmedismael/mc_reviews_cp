import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTabBarComponent } from './mini-tab-bar.component';

describe('MiniTabBarComponent', () => {
  let component: MiniTabBarComponent;
  let fixture: ComponentFixture<MiniTabBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniTabBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniTabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
