import { UserService as MedusaUserService } from "@medusajs/medusa";
import { User } from "../models/user";
import { CreateUserInput as MedusaCreateUserInput } from "@medusajs/medusa/dist/types/user";
import StoreRepository from "../repositories/store";
import SalesChannelRepository from "@medusajs/medusa/dist/repositories/sales-channel";
type CreateUserInput = {
    store_id?: string;
    stores?: any[];
} & MedusaCreateUserInput;
declare class UserService extends MedusaUserService {
    static LIFE_TIME: import("awilix").LifetimeType;
    protected readonly loggedInUser_: User | null;
    protected readonly storeRepository_: typeof StoreRepository;
    protected readonly salesChannelRepository_: typeof SalesChannelRepository;
    constructor(container: any, options: any, productService: any);
    create(user: CreateUserInput, password: string): Promise<User>;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map