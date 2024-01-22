"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRepository = void 0;
const store_1 = require("../models/store");
const database_1 = require("@medusajs/medusa/dist/loaders/database");
const store_2 = require("@medusajs/medusa/dist/repositories/store");
exports.StoreRepository = database_1.dataSource
    .getRepository(store_1.Store)
    .extend(Object.assign({}, Object.assign(store_2.StoreRepository, { target: store_1.Store })));
exports.default = exports.StoreRepository;
//# sourceMappingURL=store.js.map