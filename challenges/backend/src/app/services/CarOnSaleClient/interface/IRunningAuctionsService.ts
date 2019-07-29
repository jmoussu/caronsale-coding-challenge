/**
 * This service to display the running auction information.
 */
export interface IRunningAuctionsService {

    displayInformation(logger: any): Promise<number>;

}
