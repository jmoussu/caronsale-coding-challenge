import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarDealershipComponent } from './nav-bar-dealership.component';

describe('NavBarDealershipComponent', () => {
  let component: NavBarDealershipComponent;
  let fixture: ComponentFixture<NavBarDealershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarDealershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarDealershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
