import { TestLoginCredentials } from './TestLoginCredentials'
import { PasswordClientInfo } from './ClientInfo'
import { Tag } from '../src/Models/Tag'
import { Article } from '../src/Models/Article'
import { it, describe, before, after } from 'mocha'
import { assert } from 'chai'
import hotalog from '../src'
import FormData from 'form-data'

describe('タグのテスト', function() {
  this.timeout(10 * 1000)
  hotalog.initialize(PasswordClientInfo)
  let article = new Article()
  article.title = 'タグ付けテスト'
  article.description = ''
  article.body = {}
  article.is_published = false

  let tag = new Tag()
  tag.name = 'Test'
  tag.description = 'Test tag'

  before(async () => {
    await hotalog.login(TestLoginCredentials)
    await article.save()
    await tag.save()
  })

  after(async () => {
    await article.delete()
    await tag.delete()
  })

  it('タグの付与ができるか', async () => {
    article.tags.push(tag)
    await article.save()
    article = await Article.Find(article.id)
    assert.isNotEmpty(article.tags)
  })

  it('タグに所属している記事がカウントできてるか', async () => {
    await tag.reload()
    assert.deepEqual(tag.article_count, 1)
  })

  it('タグに所属している記事が参照できるか', async () => {
    assert.deepEqual(tag.articles[0].id, article.id)
  })

  it('記事の所属しているタグが参照できるか', async () => {
    await article.reload()
    assert.deepEqual(article.tags[0].id, tag.id)
  })
})
