import { PrismaClient } from '@prisma/client'
import multer from 'multer';
import fs from 'fs';

import prisma from '../../client'


const storage = multer.diskStorage({
    // !!!Keep commented out
    // destination: (req: Request, file: Express.Multer.File, cb: any) => {
    //     cb(null, './public/images/')
    // },
    // filename: function(req: Request, file: Express.Multer.File, cb: any){
    //     const ext = file.mimetype.split("/")[1];
    //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // }
});
 
/**
 * Used for uploading an image in app.post('/api/image/:userid/:problemid') in the controller.
 */
export const upload = multer({
    storage: storage
});

/**
 * Function to delete an image from the database given the userID and problemID.
 * @param userId 
 * the userID of the user that uploaded the image.
 * @param problemId 
 * the problemID of the problem that the image was uploaded for.
 * @returns 
 * Returns the JSON object of what's being sent to the db.
 */
export async function deleteImage(userId: number, problemId: number){
    try {
        let img = await prisma.submissionImage.delete({
            where: {
                userId_problemId: {
                    userId: userId,
                    problemId: problemId
                }
            }
        });
        return img;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete image by userId ${userId}, problemId ${problemId}: ${error}`);
        throw new Error(`Failed to delete image by userId ${userId}, problemId ${problemId}: ${error}`);
      }
}

/**
 * Get an image from the database given the userID and problemID.
 * @param userId 
 * The userID of the user that uploaded the image.
 * @param problemId 
 * The problemID of the problem that the image was uploaded for.
 * @returns 
 * Returns the JSON object of what's being sent to the db.
 */
export async function getImage(userId: number, problemId: number){
    try {
        let img = await prisma.submissionImage.findUniqueOrThrow({
            where: {
                userId_problemId: {
                    userId: userId,
                    problemId: problemId
                }
            }
        });
        return img;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get image by userId ${userId}, problemId ${problemId}: ${error}`);
        throw new Error(`Failed to get image by userId ${userId}, problemId ${problemId}: ${error}`);
      }
}

/**
 * This function encodes the image in base64 then uploads it to the database.
 * @param file 
 * the image to be uploaded
 * @param userId 
 * the userID of the user that is posting the image
 * @param problemId 
 * the problemID that the image is submitted for
 * @returns 
 * Returns the JSON object of what's being sent to the db.
 */
export async function postImage(file: any, userId: number, problemId: number){
    try {

        try{
            let checkIfExists = await getImage(userId, problemId);
            await deleteImage(userId, problemId);
        }
        catch(err) {}

        const contents = fs.readFileSync(file.path, {encoding: 'base64'});
        let submissionImage = await prisma.submissionImage.create({
            data: {
                userId: userId,
                problemId: problemId,
                img: contents
            },
        })

        return submissionImage;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post image by userId ${userId}, problemId ${problemId}: ${error}`);
        throw new Error(`Failed to post image by userId ${userId}, problemId ${problemId}: ${error}`);
      }
}