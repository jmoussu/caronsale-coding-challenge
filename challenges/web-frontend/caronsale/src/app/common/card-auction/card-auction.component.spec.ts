import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAuctionComponent } from './card-auction.component';

describe('CardAuctionComponent', () => {
  let component: CardAuctionComponent;
  let fixture: ComponentFixture<CardAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
