"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
exports.__esModule = true;
var TelegramBot = require("node-telegram-bot-api");
var index_1 = require("./firebase/index");
var TELEGRAM_TOKEN = (_a = process.env.TELEGRAM_OMNICHAT_APIKEY) !== null && _a !== void 0 ? _a : '';
var bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
function isRegistred(msg) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, index_1.firestore.collection('users').where('provider.telegram', '==', (_a = msg === null || msg === void 0 ? void 0 : msg.from) === null || _a === void 0 ? void 0 : _a.id).get()];
                case 1:
                    users = (_b.sent()).docs;
                    return [2 /*return*/, users.length === 1];
            }
        });
    });
}
function isCPF(msg) {
    var _a;
    if ((_a = msg === null || msg === void 0 ? void 0 : msg.text) === null || _a === void 0 ? void 0 : _a.match(/^\d{3}.?\d{3}.?\d{3}-?\d{2}$/gm)) {
        console.log('[IS CPF]');
        return true;
    }
    return false;
}
function createUser(msg) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, index_1.firestore.collection('users').doc((_a = msg === null || msg === void 0 ? void 0 : msg.text) !== null && _a !== void 0 ? _a : '').set({
                        name: (_b = msg === null || msg === void 0 ? void 0 : msg.from) === null || _b === void 0 ? void 0 : _b.first_name,
                        cpf: msg.text,
                        provider: { telegram: (_c = msg === null || msg === void 0 ? void 0 : msg.from) === null || _c === void 0 ? void 0 : _c.id },
                        messages: index_1.admin.firestore.FieldValue.arrayUnion({
                            type: 'text',
                            provider: 'telegram',
                            create: Date.now(),
                            message_content: msg.text,
                            message_obj: msg
                        })
                    }, { merge: true })];
                case 1:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addMessage(telegram_user_id, msg) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var users, user, doc_id;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, index_1.firestore.collection('users').where('provider.telegram', '==', (_a = msg === null || msg === void 0 ? void 0 : msg.from) === null || _a === void 0 ? void 0 : _a.id).get()];
                case 1:
                    users = (_c.sent()).docs;
                    if (users.length === 1) {
                        user = users[0];
                        doc_id = user.get('cpf');
                        index_1.firestore.collection('users').doc(doc_id).update({
                            provider: { telegram: (_b = msg === null || msg === void 0 ? void 0 : msg.from) === null || _b === void 0 ? void 0 : _b.id },
                            messages: index_1.admin.firestore.FieldValue.arrayUnion({
                                type: 'text',
                                provider: 'telegram',
                                create: Date.now(),
                                message_content: msg.text,
                                message_obj: msg
                            })
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
bot.on('text', function (msg, m) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                if (!isCPF(msg)) return [3 /*break*/, 5];
                return [4 /*yield*/, bot.sendMessage("" + ((_a = msg === null || msg === void 0 ? void 0 : msg.from) === null || _a === void 0 ? void 0 : _a.id), 'Vou procurar aqui, só um momento...')];
            case 1:
                _j.sent();
                return [4 /*yield*/, isRegistred(msg)];
            case 2:
                if (!!(_j.sent())) return [3 /*break*/, 5];
                console.log('[Not Register]');
                return [4 /*yield*/, createUser(msg)];
            case 3:
                _j.sent();
                return [4 /*yield*/, bot.sendMessage("" + ((_b = msg === null || msg === void 0 ? void 0 : msg.from) === null || _b === void 0 ? void 0 : _b.id), 'Em que posso lhe ajudar?')];
            case 4:
                _j.sent();
                _j.label = 5;
            case 5:
                if (!(!((_c = msg === null || msg === void 0 ? void 0 : msg.from) === null || _c === void 0 ? void 0 : _c.is_bot) && !isCPF(msg) && msg.text !== null)) return [3 /*break*/, 9];
                return [4 /*yield*/, isRegistred(msg)];
            case 6:
                if (!_j.sent()) return [3 /*break*/, 7];
                console.log('[Register]');
                addMessage("" + ((_d = msg === null || msg === void 0 ? void 0 : msg.from) === null || _d === void 0 ? void 0 : _d.id), msg);
                console.log("[" + ((_e = msg === null || msg === void 0 ? void 0 : msg.from) === null || _e === void 0 ? void 0 : _e.first_name) + "] " + msg.text);
                return [3 /*break*/, 9];
            case 7:
                console.log('[Not Register]');
                return [4 /*yield*/, bot.sendMessage("" + ((_f = msg === null || msg === void 0 ? void 0 : msg.from) === null || _f === void 0 ? void 0 : _f.id), 'Informe o CPF VÁLIDO por favor para proseguir com o contato.')];
            case 8:
                _j.sent();
                _j.label = 9;
            case 9:
                if ((_g = msg === null || msg === void 0 ? void 0 : msg.from) === null || _g === void 0 ? void 0 : _g.is_bot) {
                    console.log("[" + ((_h = msg === null || msg === void 0 ? void 0 : msg.from) === null || _h === void 0 ? void 0 : _h.first_name) + "] " + msg.text);
                }
                return [2 /*return*/];
        }
    });
}); });
