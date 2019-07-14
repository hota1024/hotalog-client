import { LoginCredentials } from './LoginCredentials'

export interface ILoginable {
  login(credentials: LoginCredentials): Promise<boolean>
}
