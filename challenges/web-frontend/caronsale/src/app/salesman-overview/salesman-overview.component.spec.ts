import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanOverviewComponent } from './salesman-overview.component';

describe('SalesmanOverviewComponent', () => {
  let component: SalesmanOverviewComponent;
  let fixture: ComponentFixture<SalesmanOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesmanOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmanOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
