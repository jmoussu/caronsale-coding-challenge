export type BuildURLConfig = {
  login?: boolean;
  getAuctions?: boolean;
};

export type LoginResponseType = {
  token: string;
  userid: string;
};

export type AuctionInitialData = {
  id?: number;
  numBids?: number;
  currentHighestBid?: number;
  minimumRequiredAsk?: number;
};
