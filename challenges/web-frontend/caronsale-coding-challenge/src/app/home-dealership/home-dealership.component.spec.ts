import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDealershipComponent } from './home-dealership.component';

describe('HomeComponent', () => {
  let component: HomeDealershipComponent;
  let fixture: ComponentFixture<HomeDealershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDealershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDealershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
