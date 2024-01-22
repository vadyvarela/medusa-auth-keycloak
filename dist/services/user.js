"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const medusa_1 = require("@medusajs/medusa");
class UserService extends medusa_1.UserService {
    //protected readonly publishableApiKeyRepository_: typeof PublishableApiKeyRepository;
    //protected readonly productService_: typeof ProductService;
    constructor(container, options, productService) {
        // @ts-expect-error prefer-rest-params
        super(...arguments);
        this.salesChannelRepository_ = container.salesChannelRepository;
        //this.publishableApiKeyRepository_ = container.publishableApiKeyRepository
        this.storeRepository_ = container.storeRepository;
        //this.productService_ = productService
        try {
            this.loggedInUser_ = container.loggedInUser;
        }
        catch (e) {
            // avoid errors when backend first runs
        }
    }
    async create(user, password) {
        console.log("creating user");
        user.stores = [];
        //create default saleChannel
        const saleChannelRepo = this.manager_.withRepository(this.salesChannelRepository_);
        let newSaleChannel = saleChannelRepo.create();
        newSaleChannel.name = user.first_name ? user.first_name + " " + user.last_name : user.email;
        newSaleChannel.is_disabled = false;
        newSaleChannel = await saleChannelRepo.save(newSaleChannel);
        const storeRepo = this.manager_.withRepository(this.storeRepository_);
        let newStore = storeRepo.create();
        newStore.default_sales_channel_id = newSaleChannel === null || newSaleChannel === void 0 ? void 0 : newSaleChannel.id;
        newStore = await storeRepo.save(newStore);
        user.store_id = newStore.id;
        user.stores.push(newStore);
        console.log("creating user", user);
        return await super.create(user, password);
    }
}
UserService.LIFE_TIME = awilix_1.Lifetime.SCOPED;
exports.default = UserService;
//# sourceMappingURL=user.js.map