import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAuctionSkeletonComponent } from './card-auction-skeleton.component';

describe('CardAuctionSkeletonComponent', () => {
  let component: CardAuctionSkeletonComponent;
  let fixture: ComponentFixture<CardAuctionSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAuctionSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAuctionSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
