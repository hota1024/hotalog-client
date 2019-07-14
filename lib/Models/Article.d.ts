import { Model, IModelFields } from './Model';
/**
 * 記事のフィールドインターフェイス
 */
export interface IArticleFields extends IModelFields {
    title: string;
    description: string;
    body: any;
    is_published: boolean;
}
/**
 * 記事クラス
 */
export declare class Article extends Model implements IArticleFields {
    static readonly Model = "articles";
    readonly fields: string[];
    title: string;
    description: string;
    body: any;
    is_published: boolean;
    constructor(data?: Partial<IArticleFields>);
}
