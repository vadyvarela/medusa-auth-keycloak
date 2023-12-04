"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
function PassportStrategy(Strategy, name) {
    class MixinStrategy extends Strategy {
        constructor(...args) {
            const callback = async (...params) => {
                const done = params.pop();
                try {
                    const validateResult = await this.validate(...params);
                    done(null, validateResult);
                }
                catch (err) {
                    done(err, null);
                }
            };
            super(...args, callback);
            const passportInstance = this.getPassportInstance();
            if (name) {
                passportInstance.use(name, this);
            }
            else {
                passportInstance.use(this);
            }
        }
        getPassportInstance() {
            return passport_1.default;
        }
    }
    return MixinStrategy;
}
exports.PassportStrategy = PassportStrategy;
//# sourceMappingURL=Strategy.js.map