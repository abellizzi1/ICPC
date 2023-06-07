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
exports.registerUserStatsPageEndpoints = void 0;
const userStatsPageService_1 = require("./userStatsPageService");
function registerUserStatsPageEndpoints(app) {
    app.get('/userStatsPage', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('Hello, this is the UserStatsPage');
    }));
    /**
     * Get All Info to Load UserStatsPage
     * @param userId
     * id for a user
     * @returns
     * Returns userStatsPageLogical
     */
    app.get('/userStatsPage/getUserStatsPageLogical/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userStatsPage/getUserStatsPageLogical/:userId')
            .then(response => console.log(response.data));
        */
        let activeUsers = yield (0, userStatsPageService_1.getUserStatsPageLogical)(Number(req.params.userId));
        res.send(activeUsers);
    }));
}
exports.registerUserStatsPageEndpoints = registerUserStatsPageEndpoints;
//# sourceMappingURL=userStatsPageController.js.map