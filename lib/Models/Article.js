"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
/**
 * 記事クラス
 */
class Article extends Model_1.Model {
    constructor(data) {
        super(data);
        // fields
        this.fields = [
            'id',
            'title',
            'description',
            'body',
            'is_published',
            'updated_at',
            'created_at'
        ];
        this.set(data);
    }
}
Article.Model = 'articles';
exports.Article = Article;
//# sourceMappingURL=Article.js.map