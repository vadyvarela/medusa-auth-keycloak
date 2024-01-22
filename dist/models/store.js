"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
// import { Product } from "./product";
// import { Order } from "./order";
// import { PublishableApiKey } from "./publishable_api_key"
const medusa_1 = require("@medusajs/medusa");
let Store = class Store extends medusa_1.Store {
};
exports.Store = Store;
__decorate([
    (0, typeorm_1.OneToMany)(() => user_1.User, (user) => user === null || user === void 0 ? void 0 : user.store),
    __metadata("design:type", Array)
], Store.prototype, "members", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)()
], Store);
//# sourceMappingURL=store.js.map