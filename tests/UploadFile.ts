import { FileUploader } from './../src/FileUploader/FileUploader'
import { describe, it, afterEach } from 'mocha'
import { assert } from 'chai'
import { UploadFile } from '../src/Models/UploadFile'
import fs from 'fs'

describe('ファイルアップロードのテスト', function() {
  this.timeout(10 * 1000 * 6)
  let file: UploadFile

  afterEach(async () => {
    await file.delete()
  })

  it('ファイルをアップロードできるか', async () => {
    const uploader = new FileUploader()
    uploader.attach(fs.createReadStream(`${__dirname}/file/test.md`))
    file = await uploader.upload()

    assert.equal(file.name, 'test.md')
    assert.equal(file.mime, 'text/plain')
    assert.isNotOk(file.small)
  })

  it('画像ファイルをアップロードできるか', async () => {
    const uploader = new FileUploader()
    uploader.attach(fs.createReadStream(`${__dirname}/file/test.jpg`))
    file = await uploader.upload()

    assert.equal(file.name, 'test.jpg')
    assert.equal(file.mime, 'image/jpeg')
    assert.isOk(file.small)
  })
})
