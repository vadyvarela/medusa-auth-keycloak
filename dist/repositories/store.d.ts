import { Store } from "../models/store";
export declare const StoreRepository: import("typeorm").Repository<Store> & {
    target: import("typeorm").EntityTarget<import("@medusajs/medusa").Store> & typeof Store;
    manager: import("typeorm").EntityManager;
    queryRunner?: import("typeorm").QueryRunner;
};
export default StoreRepository;
//# sourceMappingURL=store.d.ts.map