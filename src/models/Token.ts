export interface ITokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export interface IPasswordGrant {
    grant_type: 'password';
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
}

export interface IRefreshGrant {
    grant_type: 'refresh_token';
    client_id: string;
    client_secret: string;
    refresh_token: string;
}