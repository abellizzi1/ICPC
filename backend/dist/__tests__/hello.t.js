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
const difficultyService_1 = require("../src/Service/difficultyService");
const singleton_1 = require("../singleton");
describe('Example Tests', function () {
    test('test are executing', () => {
        const greeting = 'hello tests!';
        expect(greeting).toEqual('hello tests!');
    });
});
describe('Difficulty Tests', function () {
    test('creating a difficulty', () => __awaiter(this, void 0, void 0, function* () {
        const difficulty = {
            id: 1,
            name: "Test difficulty",
            isDefault: 0
        };
        singleton_1.prismaMock.difficulty.create.mockResolvedValue(difficulty);
        yield expect((0, difficultyService_1.addNewDifficulty)("Test difficulty", 1)).resolves.toEqual({
            id: 1,
            name: "Test difficulty",
            isDefault: 0
        });
    }));
});
// describe('Difficulty Tests', function() {
//     test('delete and post difficulty', async () => {
//         try {
//             //check to see if the difficulty already exists
//             let doesDiffExist = await doesDifficultyExist("Test difficulty");
//             //if it does, 
//             if (doesDiffExist) {
//                 //find the Id of the diff and delete it
//                 var diff = await getDifficultyByName("Test difficulty");
//                 await deleteDifficulty(diff.id);
//                 //check to see if there is already a mapping for this org and diff
//                 let doesDiffMapExist = await doesDifficultyMappingExist(1, diff.id);
//                 //if there is already a mapping
//                 if (doesDiffMapExist) {
//                     await removeOrgToDiffMapping(1, diff.id);
//                 } 
//             }
//         } catch (err) {console.log(err)}
//         // post difficulty
//         let difficulty = await addNewDifficulty("Test difficulty", 1);
//         expect(difficulty.id).toBeGreaterThan(0);
//         // delete it again
//         try {
//             //check to see if the difficulty already exists
//             let doesDiffExist = await doesDifficultyExist("Test difficulty");
//             //if it does, 
//             if (doesDiffExist) {
//                 //find the Id of the diff and delete it
//                 var diff = await getDifficultyByName("Test difficulty");
//                 await deleteDifficulty(diff.id);
//                 //check to see if there is already a mapping for this org and diff
//                 let doesDiffMapExist = await doesDifficultyMappingExist(1, diff.id);
//                 //if there is already a mapping
//                 if (doesDiffMapExist) {
//                     await removeOrgToDiffMapping(1, diff.id);
//                 } 
//             }
//         } catch (err) {console.log(err)}
//     });
// });
// describe('GET /category/getCategoryById/:id', () => {
//     test('returns 200 and the category with matching id', async () => {
//       // create a mock category and save it to the database
//       const { id } = await prisma.category.create({
//         data: {
//           name: 'test category',
//           isDefault: 1 // set isDefault to 1 for the mock category
//         }
//       });
//       // make a GET request to the endpoint with the mock category id
//       const response = await request(app).get(`/category/getCategoryById/${id}`);
//       // assert that the response status is 200 and the returned category matches the mock category
//       expect(response.status).toBe(200);
//       expect(response.body).toMatchObject({
//         id,
//         name: 'test category',
//         isDefault: 1 // assert that isDefault is 1 for the returned category
//       });
//     });
//     test('returns 404 when category with matching id does not exist', async () => {
//       // make a GET request to the endpoint with an id that does not exist in the database
//       const response = await request(app).get('/category/getCategoryById/999');
//       // assert that the response status is 404
//       expect(response.status).toBe(404);
//     });
//   });
//# sourceMappingURL=hello.t.js.map