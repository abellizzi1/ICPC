import {Express, Request, Response} from 'express';
import { getCategoryById } from '../Service/categoryService';
import { getDefaultCategories } from '../Service/categoryService'
import { getAllCategories } from '../Service/categoryService';
import { getCategoriesByOrgId } from '../Service/categoryService';
import { getCategoriesByUserId } from '../Service/categoryService';
import { postCategory } from '../Service/categoryService';
import { removeOrgToCatMapping } from '../Service/orgToCatMappingService';
import { getCategoryByProbId, updateCategory } from '../Service/categoryService';


export function registerCategoryEndpoints(app: Express) {
    // routing
    app.get('/category', async (req: Request, res: Response) => {
        res.send('Hello, this is the category Controller');
    });

    /** 
    Get Category By id
    @param path: id
    @return: category
    */
    app.get('/category/getCategoryById/:id', async (req: Request, res: Response) => {
        let category = await getCategoryById(Number(req.params.id));
        res.send(category);
    });

    /**
    Get Default Categories
    @param path: none
    @return: default categories
    */
    app.get('/category/getDefaultCategories', async (req: Request, res: Response) => {
        let defaultCategoryList = await getDefaultCategories();
        res.send(defaultCategoryList);
    });

    // updates a category's name
    app.put('/category/updateCategory/:categoryId', async (req: Request, res: Response) => {
        let category = await updateCategory(Number(req.params.categoryId), req.body.name);
        res.send(category);
    });

    /**
    Get All Categories
    @param path: none
    @return: all categories
    */
    app.get('/category/getAllCategories', async (req: Request, res: Response) => {
        let categoryList = await getAllCategories();
        res.send(categoryList);
    });

    /**
    Get Categories By OrgId
    @param path: orgId
    @return: all categories for a particular organization
    */
    app.get('/category/getCategoriesByOrgId/:orgId', async (req: Request, res: Response) => {
        let categoryList = await getCategoriesByOrgId(Number(req.params.orgId));
        res.send(categoryList);
    });

    /**
    Get Categories By UserId
    @param path: userId
    @return: all categories associated with a particular user
    */
    app.get('/category/getCategoriesByUserId/:userId', async (req: Request, res: Response) => {
        let categoryList = await getCategoriesByUserId(Number(req.params.userId));
        res.send(categoryList);
    });

    /**
    Get Category By Problem Id
    @param path: probId
    @return: category associated with a particular problem
    */
    app.get('/category/getCategoryByProbId/:probId', async (req: Request, res: Response) => {
        let category = await getCategoryByProbId(Number(req.params.probId));
        res.send(category);
    });

    /**
    Post Category
    @param path: userId, category name
    @return: new category
    */
    app.post('/category/postCategory/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            const category = {
            name: "name here"
            }
            axios.post('http://localhost:40000/category/postCategory/:userId', category)
            .then(response => console.log(response.data));
        */
        let category = await postCategory(Number(req.params.userId), req.body.name);
        res.send(category);
    });

    /**
    Remove Category
    @param path: userId, catId
    @return: the orgToCatMapping that has been removed
    */
    app.delete('/category/removeCategory/:userId/:catId', async (req: Request, res: Response) => {
        try{
            let orgToCatMapping = await removeOrgToCatMapping(Number(req.params.userId), Number(req.params.catId));
            res.send(orgToCatMapping);
        }
        catch(err){
            console.log(err)
        }
    });
}