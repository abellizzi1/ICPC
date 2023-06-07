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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postImage = exports.getImage = exports.deleteImage = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const client_1 = __importDefault(require("../../client"));
const storage = multer_1.default.diskStorage({
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
exports.upload = (0, multer_1.default)({
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
function deleteImage(userId, problemId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let img = yield client_1.default.submissionImage.delete({
                where: {
                    userId_problemId: {
                        userId: userId,
                        problemId: problemId
                    }
                }
            });
            return img;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete image by userId ${userId}, problemId ${problemId}: ${error}`);
            throw new Error(`Failed to delete image by userId ${userId}, problemId ${problemId}: ${error}`);
        }
    });
}
exports.deleteImage = deleteImage;
/**
 * Get an image from the database given the userID and problemID.
 * @param userId
 * The userID of the user that uploaded the image.
 * @param problemId
 * The problemID of the problem that the image was uploaded for.
 * @returns
 * Returns the JSON object of what's being sent to the db.
 */
function getImage(userId, problemId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let img = yield client_1.default.submissionImage.findUniqueOrThrow({
                where: {
                    userId_problemId: {
                        userId: userId,
                        problemId: problemId
                    }
                }
            });
            return img;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get image by userId ${userId}, problemId ${problemId}: ${error}`);
            throw new Error(`Failed to get image by userId ${userId}, problemId ${problemId}: ${error}`);
        }
    });
}
exports.getImage = getImage;
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
function postImage(file, userId, problemId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            try {
                let checkIfExists = yield getImage(userId, problemId);
                yield deleteImage(userId, problemId);
            }
            catch (err) { }
            const contents = fs_1.default.readFileSync(file.path, { encoding: 'base64' });
            let submissionImage = yield client_1.default.submissionImage.create({
                data: {
                    userId: userId,
                    problemId: problemId,
                    img: contents
                },
            });
            return submissionImage;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post image by userId ${userId}, problemId ${problemId}: ${error}`);
            throw new Error(`Failed to post image by userId ${userId}, problemId ${problemId}: ${error}`);
        }
    });
}
exports.postImage = postImage;
//# sourceMappingURL=submissionImageService.js.map