export interface IDeletable {
    delete(): Promise<boolean>;
}
