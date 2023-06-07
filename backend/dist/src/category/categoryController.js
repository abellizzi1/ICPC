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
exports.registerCategoryEndpoints = void 0;
const categoryService_1 = require("./categoryService");
const categoryService_2 = require("./categoryService");
const categoryService_3 = require("./categoryService");
const categoryService_4 = require("./categoryService");
const categoryService_5 = require("./categoryService");
const categoryService_6 = require("./categoryService");
const orgToCatMappingService_1 = require("../orgToCatMapping/orgToCatMappingService");
const categoryService_7 = require("./categoryService");
function registerCategoryEndpoints(app) {
    // routing
    app.get('/category', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('Hello, this is the category Controller');
    }));
    /**
    Get Category By id
    @param path: id
    @return: category
    */
    app.get('/category/getCategoryById/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let category = yield (0, categoryService_1.getCategoryById)(Number(req.params.id));
        res.send(category);
    }));
    /**
    Get Default Categories
    @param path: none
    @return: default categories
    */
    app.get('/category/getDefaultCategories', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let defaultCategoryList = yield (0, categoryService_2.getDefaultCategories)();
        res.send(defaultCategoryList);
    }));
    /**
    Get All Categories
    @param path: none
    @return: all categories
    */
    app.get('/category/getAllCategories', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let categoryList = yield (0, categoryService_3.getAllCategories)();
        res.send(categoryList);
    }));
    /**
    Get Categories By OrgId
    @param path: orgId
    @return: all categories for a particular organization
    */
    app.get('/category/getCategoriesByOrgId/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let categoryList = yield (0, categoryService_4.getCategoriesByOrgId)(Number(req.params.orgId));
        res.send(categoryList);
    }));
    /**
    Get Categories By UserId
    @param path: userId
    @return: all categories associated with a particular user
    */
    app.get('/category/getCategoriesByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let categoryList = yield (0, categoryService_5.getCategoriesByUserId)(Number(req.params.userId));
        res.send(categoryList);
    }));
    /**
    Get Category By Problem Id
    @param path: probId
    @return: category associated with a particular problem
    */
    app.get('/category/getCategoryByProbId/:probId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let category = yield (0, categoryService_7.getCategoryByProbId)(Number(req.params.probId));
        res.send(category);
    }));
    /**
    Post Category
    @param path: userId, category name
    @return: new category
    */
    app.post('/category/postCategory/:userId/:category', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            const organization = {
            name: "name here"
            }
            axios.post('http://localhost:40000/organization/postOrganization', organization)
            .then(response => console.log(response.data));
        */
        let category = yield (0, categoryService_6.postCategory)(Number(req.params.userId), req.params.category);
        res.send(category);
    }));
    /**
    Remove Category
    @param path: userId, catId
    @return: the orgToCatMapping that has been removed
    */
    app.delete('/category/removeCategory/:userId/:catId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let orgToCatMapping = yield (0, orgToCatMappingService_1.removeOrgToCatMapping)(Number(req.params.userId), Number(req.params.catId));
            res.send(orgToCatMapping);
        }
        catch (err) {
            console.log(err);
        }
    }));
}
exports.registerCategoryEndpoints = registerCategoryEndpoints;
//# sourceMappingURL=categoryController.js.map