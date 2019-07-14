import { AxiosRequestable } from './../AxiosRequestable/AxiosRequestable'
import { HeartData } from './HeartData'
import { ClientInfo } from './ClientInfo'
import { LoginCredentials } from './../Login/LoginCredentials'
import { IClient } from './IClient'
import axios, { AxiosInstance } from 'axios'

export class Client implements IClient {
  private axios: AxiosInstance
  private data: ClientInfo
  private _loggedIn: boolean

  /**
   * クライアントを初期化します。
   * @param {ClientInfo} data クライアント情報
   */
  initialize(data: ClientInfo) {
    this.data = data
    this._loggedIn
    this.axios = axios.create({
      baseURL: data.url,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    AxiosRequestable.SetAxios(this.axios)
  }

  /**
   * アクセストークンの情報を返します。
   */
  public async heart() {
    const response = await this.axios.get('/api/heart')
    const data = response.data as HeartData

    this._loggedIn = response.data.logged_in

    return data
  }

  /**
   * ログインします。
   * @param {LoginCredentials} credentials ログイン情報
   */
  public async login(credentials: LoginCredentials) {
    const response = await this.axios.post('/oauth/token', {
      grant_type: this.data.grant_type,
      client_id: this.data.client_id,
      client_secret: this.data.client_secret,
      ...credentials
    })
    this.axios.defaults.headers = {
      Authorization: `Bearer ${response.data.access_token}`
    }
    this._loggedIn = true

    return true
  }

  /**
   * ログアウトします。
   */
  public async logout() {
    this._loggedIn = false
    this.axios.defaults.headers = {}
    return true
  }
}
