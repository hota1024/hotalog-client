import { AxiosInstance } from 'axios';
/**
 * モデルフィールドインターフェイス
 */
export interface IModelFields {
    id: string | number;
    created_at: Date;
    updated_at: Date;
}
export declare const FieldSetCaster: (field: string) => string;
/**
 * モデルクラス
 */
export declare class Model implements IModelFields {
    static readonly Model: string;
    readonly fields: Array<string>;
    id: string | number;
    created_at: Date;
    updated_at: Date;
    private static axios;
    private axios;
    protected constructor(data?: Partial<IModelFields>);
    set(data: any): void;
    path(): string;
    static Path(): string;
    isNew(): boolean;
    static Find(id: string | number): Promise<Model>;
    save(): Promise<void>;
    private store;
    update(): Promise<void>;
    /**
     * Set axios instance
     * @param {AxiosInstance} axios axios instance
     */
    static SetAxios(axios: AxiosInstance): void;
}
