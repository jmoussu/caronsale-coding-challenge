import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSalesmanComponent } from './nav-bar-salesman.component';

describe('NavBarSalesmanComponent', () => {
  let component: NavBarSalesmanComponent;
  let fixture: ComponentFixture<NavBarSalesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarSalesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarSalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
