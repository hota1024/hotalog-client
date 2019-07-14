import { Tag, ITagFields } from './Tag'
import {
  Model,
  IModelFields,
  FieldSetCaster,
  FieldDefaultGetter,
  FieldPostCaster
} from './Model'

/**
 * Interface of Article fields
 */
export interface IArticleFields extends IModelFields {
  title: string
  description: string
  body: any
  is_published: boolean
  tags: Array<any>
}

/**
 * 記事クラス
 */
export class Article extends Model implements IArticleFields {
  public static readonly Model = 'articles'

  // fields
  public readonly fields = [
    'id',
    'title',
    'description',
    'body',
    'is_published',
    'updated_at',
    'created_at',
    'tags'
  ]
  public title: string
  public description: string
  public body: any
  public is_published: boolean
  public tags: Array<Tag>

  public constructor(data?: Partial<IArticleFields>) {
    super(data)
    this.set(data)
  }

  public static async Find(id: string | number) {
    return new Article(await super.Find(id))
  }

  private [FieldDefaultGetter('tags')]() {
    return []
  }

  private [FieldSetCaster('tags')](tags: Array<ITagFields>) {
    return tags.map(tag => new Tag(tag))
  }

  private [FieldPostCaster('tags')]() {
    return this.tags.map(tag => tag.id)
  }
}
