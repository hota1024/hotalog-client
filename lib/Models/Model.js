"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSetCaster = (field) => `cast_field_set_${field}`;
/**
 * モデルクラス
 */
class Model {
    constructor(data) {
        this.axios = Model.axios;
    }
    set(data) {
        this.fields.forEach(field => {
            if (data[field] !== undefined) {
                const fieldCaster = this[exports.FieldSetCaster(field)];
                this[field] = fieldCaster ? fieldCaster(data[field]) : data[field];
            }
            else {
                this[field] = null;
            }
        });
    }
    [exports.FieldSetCaster('created_at')](value) {
        return new Date(value);
    }
    [exports.FieldSetCaster('updated_at')](value) {
        return new Date(value);
    }
    path() {
        return `/api/${this.constructor['Model']}/${this.id}`;
    }
    static Path() {
        return `/api/${this.Model}`;
    }
    isNew() {
        return !!this.id;
    }
    // CRUD
    static Find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.get(`${this.Path()}/${id}`);
            return new this(response.data);
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = this.isNew() ? this.store() : this.update();
            yield promise;
        });
    }
    store() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.post(this.path());
            this.set(response.data);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.patch(this.path());
            this.set(response.data);
        });
    }
    /**
     * Set axios instance
     * @param {AxiosInstance} axios axios instance
     */
    static SetAxios(axios) {
        Model.axios = axios;
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map