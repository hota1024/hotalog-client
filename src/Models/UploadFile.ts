import { Model, IModelFields } from './Model'
import FormData from 'form-data'

export interface IUploadFileFields extends IModelFields {
  name: string
  filename: string
  size: number
  mime: string
  width?: number
  height?: number
  small_id?: string
  is_small?: boolean
  small?: UploadFile
}

export class UploadFile extends Model implements IUploadFileFields {
  public static readonly Model = 'upload_files'

  // Fields

  public readonly fields = [
    'id',
    'name',
    'size',
    'mime',
    'width',
    'height',
    'small_id',
    'is_small',
    'small'
  ]

  public name: string
  public filename: string
  public size: number
  public mime: string
  public width?: number
  public height?: number
  public small_id?: string
  public is_small?: boolean
  public small?: UploadFile

  public constructor(data?: Partial<IUploadFileFields>) {
    super()
    this.set(data)
  }

  public upload(file: any) {
    const form = new FormData()
    form.append('file', file)
  }
}
