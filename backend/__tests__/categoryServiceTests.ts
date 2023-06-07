import { prismaMock } from '../singleton';
import { getCategoryById } from '../src/Service/categoryService';
import { getDefaultCategories } from '../src/Service/categoryService';
import { getAllCategories } from '../src/Service/categoryService';
import { getCategoriesByOrgId } from '../src/Service/categoryService';
import { getCategoriesByUserId } from '../src/Service/categoryService';
import { getCategoryByProbId } from '../src/Service/categoryService';


describe('Category Tests', function() {

    test('get category by id', async () => {
        const cat = {
            id: 1,
            name: "Test category",
            isDefault: 1
        }
    
        prismaMock.category.findUniqueOrThrow.mockResolvedValue(cat);
    
        await expect(getCategoryById(1)).resolves.toEqual({
            id: 1,
            name: "Test category",
            isDefault: 1
        });
    });

    test('get default categories', async () => {
        const defaultCategories = [
          {
            id: 1,
            name: 'Default Category 1',
            isDefault: 1
          },
          {
            id: 2,
            name: 'Default Category 2',
            isDefault: 1
          }
        ];
      
        prismaMock.category.findMany.mockResolvedValue(defaultCategories);
      
        await expect(getDefaultCategories()).resolves.toEqual(defaultCategories);
      });

      test("get all categories", async () => {
        const categories = [
          {
            id: 1,
            name: "Category 1",
            isDefault: 0,
          },
          {
            id: 2,
            name: "Category 2",
            isDefault: 0,
          },
        ];
    
        prismaMock.category.findMany.mockResolvedValue(categories);
    
        await expect(getAllCategories()).resolves.toEqual(categories);
      });

      test('get categories by orgId', async () => {
        const orgId = 1;
      
        const category1 = {
          id: 1,
          name: 'Category 1',
          isDefault: 0,
        };
      
        const category2 = {
          id: 2,
          name: 'Category 2',
          isDefault: 0,
        };
      
        const categories = [category1, category2];
      
        const organizationToCategoryMappings = [
          { organizationId: orgId, categoryId: 1 },
          { organizationId: orgId, categoryId: 2 },
        ];
      
        prismaMock.$queryRaw.mockResolvedValue(categories);
      
        prismaMock.orgToCategoryMapping.findMany.mockResolvedValue(organizationToCategoryMappings);
      
        const result = await getCategoriesByOrgId(orgId);
      
        expect(result).toEqual(categories);
      });

      test('get categories by userId', async () => {
        const user = {
          id: 1,
          firstName: 'Test',
          lastName: 'User',
          email: 'testuser@example.com',
          password: 'password',
          phone: '123-456-7890',
          isAdmin: 0,
          isHeadCoach: 0,
          isAssistantCoach: 0,
          isCoach: 1,
          isMentor: 0,
          isStudent: 1,
          isActive: 1,
          leetcodeUsername: null,
          codeforcesUsername: null,
          uhuntId: null
        };
      
        const organization = {
          id: 1,
          name: 'Test Organization'
        };
      
        const category1 = {
          id: 1,
          name: 'Test Category 1',
          isDefault: 0
        };
      
        const category2 = {
          id: 2,
          name: 'Test Category 2',
          isDefault: 0
        };
      
        const userToOrganization = {
          userId: user.id,
          organizationId: organization.id
        };
      
        const orgToCatMapping1 = {
          organizationId: organization.id,
          categoryId: category1.id
        };
      
        const orgToCatMapping2 = {
          organizationId: organization.id,
          categoryId: category2.id
        };
      
        // Mock the database queries
        prismaMock.$queryRaw
          .mockResolvedValueOnce([category1, category2])
          .mockResolvedValueOnce([userToOrganization])
          .mockResolvedValueOnce([orgToCatMapping1, orgToCatMapping2]);
      
        // Call the function
        const categories = await getCategoriesByUserId(user.id);
      
        // Assert that the correct categories are returned
        expect(categories).toEqual(expect.arrayContaining([
          {
            id: category1.id,
            name: category1.name,
            isDefault: category1.isDefault
          },
          {
            id: category2.id,
            name: category2.name,
            isDefault: category2.isDefault
          }
        ]));
      });

      test('get category by problem id', async () => {
        const probId = 1;
      
        const category = {
          id: 1,
          name: 'Category 1',
          isDefault: 1
        };
      
        const problemToCategory = {
          problemId: probId,
          categoryId: category.id
        };
      
        // Mock the database queries
        prismaMock.$queryRaw
          .mockResolvedValueOnce([category])
          .mockResolvedValueOnce([problemToCategory]);
      
        // Call the function
        const result = await getCategoryByProbId(probId);
      
        // Assert that the correct category is returned
        expect(result).toEqual(category);
      });
      

})

