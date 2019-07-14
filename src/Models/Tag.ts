import {
  Model,
  IModelFields,
  FieldPostCaster,
  FieldDefaultGetter,
  FieldSetCaster
} from './Model'
import { Article, IArticleFields } from './Article'

export interface ITagFields extends IModelFields {
  name: string
  description: string
  article_count: number
  articles: Array<Article>
}

export class Tag extends Model implements ITagFields {
  public static readonly Model = 'tags'

  public readonly fields = [
    'id',
    'name',
    'description',
    'updated_at',
    'created_at',
    'article_count',
    'articles'
  ]
  public name: string
  public description: string
  public article_count: number
  public articles: Array<Article>

  public constructor(data?: Partial<ITagFields>) {
    super(data)
    this.set(data)
  }

  public static async Find(id: string | number) {
    return new Tag(await super.Find(id))
  }

  private [FieldDefaultGetter('article_count')]() {
    return 0
  }

  private [FieldPostCaster('article_count')]() {
    return null
  }

  private [FieldSetCaster('articles')](articles: Array<IArticleFields>) {
    return articles.map(article => new Article(article))
  }

  private [FieldDefaultGetter('articles')]() {
    return []
  }

  private [FieldPostCaster('articles')]() {
    return null
  }
}
