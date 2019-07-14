import { AxiosInstance } from 'axios'

/**
 * Axios requestable class
 */
export class AxiosRequestable {
  protected static axios: AxiosInstance
  protected axios: AxiosInstance

  constructor() {
    this.axios = AxiosRequestable.axios
  }

  /**
   * Set common axios instance
   * @param axios Axios instance
   */
  public static SetAxios(axios: AxiosInstance) {
    AxiosRequestable.axios = axios
  }
}
