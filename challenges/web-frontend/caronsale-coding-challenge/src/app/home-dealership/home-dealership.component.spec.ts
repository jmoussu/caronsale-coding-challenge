import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSalesmanComponent } from './home-salesman.component';

describe('HomeComponent', () => {
  let component: HomeSalesmanComponent;
  let fixture: ComponentFixture<HomeSalesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSalesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
