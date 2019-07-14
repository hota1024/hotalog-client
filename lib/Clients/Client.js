"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./../Models/Model");
const axios_1 = __importDefault(require("axios"));
class Client {
    /**
     * クライアントを初期化します。
     * @param {ClientInfo} data クライアント情報
     */
    initialize(data) {
        this.data = data;
        this._loggedIn;
        this.axios = axios_1.default.create({
            baseURL: data.url,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        Model_1.Model.SetAxios(this.axios);
    }
    /**
     * アクセストークンの情報を返します。
     */
    heart() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.get('/api/heart');
            const data = response.data;
            this._loggedIn = response.data.logged_in;
            return data;
        });
    }
    /**
     * ログインします。
     * @param {LoginCredentials} credentials ログイン情報
     */
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.post('/oauth/token', Object.assign({ grant_type: this.data.grant_type, client_id: this.data.client_id, client_secret: this.data.client_secret }, credentials));
            this.axios.defaults.headers = {
                Authorization: `Bearer ${response.data.access_token}`
            };
            this._loggedIn = true;
            return true;
        });
    }
    /**
     * ログアウトします。
     */
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this._loggedIn = false;
            this.axios.defaults.headers = {};
            return true;
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map