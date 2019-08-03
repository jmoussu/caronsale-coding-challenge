import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipOverviewComponent } from './dealership-overview.component';

describe('DealershipOverviewComponent', () => {
  let component: DealershipOverviewComponent;
  let fixture: ComponentFixture<DealershipOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealershipOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealershipOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
