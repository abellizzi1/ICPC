import express, {Express, Request, Response} from 'express';
import { postImage, getImage, deleteImage, upload } from '../Service/submissionImageService';

export function registerSubmissionImageEndpoints(app: Express) {
    
    /*
    Posts an image to the database.
    Given a file:
    const formData = new FormData();
    formData.append('image', file, file.filename);
    Then send this formData in the body.
    */
    app.post('/api/image/:userid/:problemid', upload.single('image'), async (req: Request, res: Response) => {
        try{
            let userId = Number(req.params.userid);
            let problemId = Number(req.params.problemid);
            let img = await postImage(req.file, userId, problemId);
            res.send(img);
        }
        catch(err){
            console.log(err)
        }
    });

    /*
    Gets an image by userID and problemID
    */
    app.get('/api/image/:userid/:problemid', async (req: Request, res: Response) => {
        try{
            let userId = Number(req.params.userid);
            let problemId = Number(req.params.problemid);
            let img = await getImage(userId, problemId);
            res.send(img);
        }
        catch(err){
            console.log(err)
        }
    });

    /*
    Deletes an image by userID and problemID
    */
    app.delete('/api/image/:userid/:problemid', async (req: Request, res: Response) => {
        try{
            let userId = Number(req.params.userid);
            let problemId = Number(req.params.problemid);
            let img = await deleteImage(userId, problemId);
            res.send(img);
        }
        catch(err){
            console.log(err)
        }
    });
}



