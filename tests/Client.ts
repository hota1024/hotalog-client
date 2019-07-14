import { TestLoginCredentials } from './TestLoginCredentials'
import { PasswordClientInfo } from './ClientInfo'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import hotalog from '../src'

describe('クライアントのテスト', function() {
  this.timeout(10 * 1000)
  hotalog.initialize(PasswordClientInfo)

  it('ログインできるのか', async () => {
    await hotalog.login(TestLoginCredentials)
    const heart = await hotalog.heart()

    assert.isTrue(heart.logged_in)
  })

  it('ログアウトできるのか', async () => {
    await hotalog.login(TestLoginCredentials)
    await hotalog.logout()
    const heart = await hotalog.heart()

    assert.isFalse(heart.logged_in)
  })
})
