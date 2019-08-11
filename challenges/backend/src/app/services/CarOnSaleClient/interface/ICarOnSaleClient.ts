/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
import IRunningAuctionListViewModel = ViewModel.IRunningAuctionListViewModel;

export interface ICarOnSaleClient {
    getRunningAuctions(): Promise<IRunningAuctionListViewModel>
}