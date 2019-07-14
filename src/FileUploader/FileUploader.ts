import { UploadFile } from './../Models/UploadFile'
import { AxiosRequestable } from './../AxiosRequestable/AxiosRequestable'
import { AxiosRequestConfig } from 'axios'
import NodeFormData from 'form-data'
import fs from 'fs'

interface Window {}
declare let window: Window

const CommonFormData = typeof window === 'undefined' ? NodeFormData : FormData

/**
 * FileUploader class
 */
export class FileUploader extends AxiosRequestable {
  private file: File | fs.ReadStream

  /**
   * Attach file
   * @param file File
   */
  public attach(file: File | fs.ReadStream) {
    this.file = file
    return this
  }

  /**
   * Upload
   * @returns {UploadFile} Uploaded file
   */
  public async upload(config?: AxiosRequestConfig) {
    const formData = this.getFormData()
    let headers = undefined
    if (typeof window === 'undefined') {
      headers = (formData as any).getHeaders()
    }
    const response = await this.axios.post('/api/upload_files', formData, {
      ...config,
      headers
    })
    // return response.data
    return new UploadFile(response.data)
  }

  private getFormData() {
    const data = new CommonFormData()
    data.append('file', this.file as File)

    return data
  }
}
