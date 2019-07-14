import { TestLoginCredentials } from './TestLoginCredentials'
import { PasswordClientInfo } from './ClientInfo'
import { Article } from '../src/Models/Article'
import { describe, it, before, after } from 'mocha'
import { assert } from 'chai'
import hotalog from '../src'

describe('記事クラスのテスト', function() {
  this.timeout(10 * 1000)
  hotalog.initialize(PasswordClientInfo)
  let article: Article

  before(async () => {
    await hotalog.login(TestLoginCredentials)
  })

  it('記事の作成ができるか', async () => {
    article = new Article()
    article.title = 'テスト'
    article.description = 'これはテストです'
    article.body = { nodes: [] }
    article.is_published = false
    await article.save()

    assert.isOk(article.id)
    assert.deepEqual(article.title, 'テスト')
  })

  it('記事の取得ができるか', async () => {
    await hotalog.login(TestLoginCredentials)
    article = await Article.Find(article.id)

    assert.deepEqual(article.title, 'テスト')
  })

  it('記事の更新ができるか', async () => {
    let beforeUpdatedAt = article.updated_at

    article.title = '更新したよ'
    await article.save()
    article = await Article.Find(article.id)

    assert.deepEqual(article.title, '更新したよ')
    assert.notEqual(article.updated_at, beforeUpdatedAt)
  })

  it('記事の削除ができるのか', async () => {
    await article.delete()
  })
})
