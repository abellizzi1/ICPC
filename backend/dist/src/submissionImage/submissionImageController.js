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
exports.registerSubmissionImageEndpoints = void 0;
const submissionImageService_1 = require("./submissionImageService");
function registerSubmissionImageEndpoints(app) {
    /*
    Posts an image to the database.
    Given a file:
    const formData = new FormData();
    formData.append('image', file, file.filename);
    Then send this formData in the body.
    */
    app.post('/api/image/:userid/:problemid', submissionImageService_1.upload.single('image'), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let userId = Number(req.params.userid);
            let problemId = Number(req.params.problemid);
            let img = yield (0, submissionImageService_1.postImage)(req.file, userId, problemId);
            res.send(img);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /*
    Gets an image by userID and problemID
    */
    app.get('/api/image/:userid/:problemid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let userId = Number(req.params.userid);
            let problemId = Number(req.params.problemid);
            let img = yield (0, submissionImageService_1.getImage)(userId, problemId);
            res.send(img);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /*
    Deletes an image by userID and problemID
    */
    app.delete('/api/image/:userid/:problemid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let userId = Number(req.params.userid);
            let problemId = Number(req.params.problemid);
            let img = yield (0, submissionImageService_1.deleteImage)(userId, problemId);
            res.send(img);
        }
        catch (err) {
            console.log(err);
        }
    }));
}
exports.registerSubmissionImageEndpoints = registerSubmissionImageEndpoints;
//# sourceMappingURL=submissionImageController.js.map