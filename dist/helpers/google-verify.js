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
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleVerify = void 0;
const google_auth_library_1 = require("google-auth-library");
const config_1 = require("../config");
const client = new google_auth_library_1.OAuth2Client(config_1.GOOGLE_CLIENT_ID);
function googleVerify(token = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: config_1.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        console.log("payload", payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        const { given_name, family_name, picture, email } = payload;
        return {
            nombres: family_name,
            apellido: given_name,
            img: picture,
            email: email
        };
        //
    });
}
exports.googleVerify = googleVerify;
//# sourceMappingURL=google-verify.js.map