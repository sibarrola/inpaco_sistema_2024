"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_CLIENT_ID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
exports.default = SECRET_KEY;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
//# sourceMappingURL=config.js.map