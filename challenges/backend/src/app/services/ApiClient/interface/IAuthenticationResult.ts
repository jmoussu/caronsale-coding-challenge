export interface IAuthenticationResult {
    authenticated: boolean;
    userId: string;
    token: string;
    type: string;
    privileges: string;
}