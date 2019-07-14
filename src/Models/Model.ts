import { AxiosRequestable } from './../AxiosRequestable/AxiosRequestable'
import { AxiosInstance, AxiosProxyConfig, AxiosRequestConfig } from 'axios'
import { EventEmitter } from 'events'
import FormData from 'form-data'

/**
 * モデルフィールドインターフェイス
 */
export interface IModelFields {
  id: string | number
  created_at: Date
  updated_at: Date
}

export const FieldSetCaster = (field: string) => `cast_field_set_${field}`
export const FieldDefaultGetter = (field: string) =>
  `default_field_get_${field}`
export const FieldPostCaster = (field: string) => `cast_field_post_${field}`

/**
 * モデルクラス
 */
export class Model extends AxiosRequestable implements IModelFields {
  public static readonly Model: string

  // fields
  public readonly fields: Array<string>
  public id: string | number
  public created_at: Date
  public updated_at: Date

  protected constructor(data?: Partial<IModelFields>) {
    super()
  }

  public set(data: any = {}) {
    this.fields.forEach(field => {
      if (data[field] !== undefined) {
        const fieldCaster = this[FieldSetCaster(field)]
        this[field] = fieldCaster ? fieldCaster(data[field]) : data[field]
      } else {
        const fieldDefault = this[FieldDefaultGetter(field)]
        this[field] = fieldDefault ? fieldDefault() : null
      }
    })
  }

  protected [FieldSetCaster('created_at')](value: string) {
    return new Date(value)
  }

  protected [FieldSetCaster('updated_at')](value: string) {
    return new Date(value)
  }

  protected [FieldPostCaster('created_at')]() {
    return null
  }

  protected [FieldPostCaster('updated_at')]() {
    return null
  }

  public path() {
    return `/api/${this.constructor['Model']}/${this.id}`
  }

  public static Path() {
    return `/api/${this.Model}`
  }

  public isNew() {
    return !this.id
  }

  public postData() {
    let data = {}
    this.fields.forEach(field => {
      const fieldCaster = this[FieldPostCaster(field)]
      if (fieldCaster) {
        const casted = fieldCaster.call(this, this[field])
        if (casted !== null) data[field] = casted
      } else {
        data[field] = this[field]
      }
    })
    return data
  }

  // CRUD
  /**
   * Get Model data by ID
   * @param id Model ID
   */
  public static async Find(id: string | number) {
    const response = await this.axios.get(`${this.Path()}/${id}`)
    return response.data
  }

  public async reload() {
    this.set(await (this.constructor as any).Find(this.id))
  }

  public async save(config?: AxiosRequestConfig) {
    if (this.isNew()) {
      await this.store(config)
    } else {
      await this.update(config)
    }
  }

  private async store(config?: AxiosRequestConfig) {
    const response = await this.axios.post(
      (this.constructor as any).Path(),
      this.postData(),
      config
    )
    this.set(response.data)
  }

  public async update(config?: AxiosRequestConfig) {
    const response = await this.axios.patch(
      this.path(),
      this.postData(),
      config
    )
  }

  public async delete() {
    await this.axios.delete(this.path())
  }

  public raw() {
    let raw = {}

    this.fields.forEach(field => {
      raw[field] = this[field]
    })

    return raw
  }

  /**
   * Set axios instance
   * @param {AxiosInstance} axios axios instance
   */
  public static SetAxios(axios: AxiosInstance) {
    Model.axios = axios
  }
}
