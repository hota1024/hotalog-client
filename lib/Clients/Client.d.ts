import { HeartData } from './HeartData';
import { ClientInfo } from './ClientInfo';
import { LoginCredentials } from './../Login/LoginCredentials';
import { IClient } from './IClient';
export declare class Client implements IClient {
    private axios;
    private data;
    private _loggedIn;
    /**
     * クライアントを初期化します。
     * @param {ClientInfo} data クライアント情報
     */
    initialize(data: ClientInfo): void;
    /**
     * アクセストークンの情報を返します。
     */
    heart(): Promise<HeartData>;
    /**
     * ログインします。
     * @param {LoginCredentials} credentials ログイン情報
     */
    login(credentials: LoginCredentials): Promise<boolean>;
    /**
     * ログアウトします。
     */
    logout(): Promise<boolean>;
}
