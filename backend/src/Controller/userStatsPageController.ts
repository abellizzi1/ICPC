import {Express, Request, Response} from 'express';
import { getUserStatsPageLogical } from '../Service/userStatsPageService';


export function registerUserStatsPageEndpoints(app: Express) {
    app.get('/userStatsPage', async (req: Request, res: Response) => {
        res.send('Hello, this is the UserStatsPage');
    });

    /**
     * Get All Info to Load UserStatsPage
     * @param userId 
     * id for a user
     * @returns 
     * Returns userStatsPageLogical
     */
        app.get('/userStatsPage/getUserStatsPageLogical/:userId', async (req: Request, res: Response) => {
            /*
                Example axios call: 
                axios.get('http://localhost:40000/userStatsPage/getUserStatsPageLogical/:userId')
                .then(response => console.log(response.data));
            */
            let activeUsers = await getUserStatsPageLogical(Number(req.params.userId));
            res.send(activeUsers);
        });

}