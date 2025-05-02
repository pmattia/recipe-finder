import { TestBed } from '@angular/core/testing';
import { RECIPE_DETAILS_MOCK, RECIPES_PREVIEW_MOCK } from '../../mocks/mock-data';
import { RecipesService } from './api.service';
import API_RECIPES_MOCK from '../../mocks/recipes.json'
import API_EMPTY_RESPONSE_MOCK from '../../mocks/empy-response.json'
import API_RECIPE_DETAILS_MOCK from '../../mocks/recipe-detail.json'

describe('RecipeService', () => {
    let service: RecipesService;
    const mockApiRecipes = API_RECIPES_MOCK;
    const mockApiRecipeDetails = API_RECIPE_DETAILS_MOCK;
    const mockEmptyApiResponse = API_EMPTY_RESPONSE_MOCK;
    
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RecipesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });  

    it('should search recipes from API', async () => {
        const query = 'chicken';
        const toBeRecipesPreview = RECIPES_PREVIEW_MOCK;

        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockApiRecipes)
        } as Response));

        const recipes = await service.searchRecipe(query);
        expect(recipes).toBeDefined();
        expect(Array.isArray(recipes)).toBeTrue();
        expect(recipes.length).toBe(toBeRecipesPreview.length);
        expect(recipes).toEqual(toBeRecipesPreview);
    });

    it('should throw an error if searchRecipe fails', async () => {
        const query = 'chicken';
        
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: false,
            json: () => Promise.resolve({})
        } as Response));

        await expectAsync(service.searchRecipe(query)).toBeRejectedWithError('Failed to fetch recipes');
    });

    
    it('should return empty array if searchRecipe returns null', async () => {
        const query = 'chicken';

        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockEmptyApiResponse)
        } as Response));

        const recipes = await service.searchRecipe(query);
        expect(recipes).toBeDefined();
        expect(Array.isArray(recipes)).toBeTrue();
        expect(recipes.length).toBe(0);
    });

    it('should fetch recipe details from API', async () => {
        const id = '52772';
        const toBeRecipeDetails = RECIPE_DETAILS_MOCK;

        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockApiRecipeDetails)
        } as Response));

        const recipe = await service.getRecipeDetails(id);
        expect(recipe).toBeDefined();
        expect(recipe.id).toBe(id);
        expect(recipe).toEqual(toBeRecipeDetails);
    });

    it('should throw an error if getRecipeDetails fails', async () => {
        const id = '52772';
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: false,
            json: () => Promise.resolve({})
        } as Response));

        await expectAsync(service.getRecipeDetails(id)).toBeRejectedWithError('Failed to fetch recipe');
    });

    it('should throw an error if getRecipeDetails returns null', async () => {
        const id = '52772';
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockEmptyApiResponse)
        } as Response));

        await expectAsync(service.getRecipeDetails(id)).toBeRejectedWithError('Failed to fetch recipe');
    });
});