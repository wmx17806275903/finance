import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBudgetComponent } from './home-budget.component';

describe('HomeBudgetComponent', () => {
  let component: HomeBudgetComponent;
  let fixture: ComponentFixture<HomeBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
