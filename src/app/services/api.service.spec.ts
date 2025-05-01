import { TestBed } from '@angular/core/testing';
import { API_EMPTY_RESPONSE_MOCK, API_RECIPE_DETAILS_MOCK, API_RECIPES_MOCK, RECIPE_DETAILS_MOCK, RECIPES_PREVIEW_MOCK } from '../models/mock-data';
import { RecipesService } from './api.service';

describe('RecipeService', () => {
    let service: RecipesService;
    const mockApiRecipes = API_RECIPES_MOCK;
    const mockRecipesPreview = RECIPES_PREVIEW_MOCK;
    const mockApiRecipeDetails = API_RECIPE_DETAILS_MOCK;
    const mockRecipeDetails = RECIPE_DETAILS_MOCK;
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
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockApiRecipes)
        } as Response));

        const recipes = await service.searchRecipe(query);
        expect(recipes).toBeDefined();
        expect(Array.isArray(recipes)).toBeTrue();
        expect(recipes.length).toBe(mockRecipesPreview.length);
        expect(recipes).toEqual(mockRecipesPreview);
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

        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockApiRecipeDetails)
        } as Response));

        const recipe = await service.getRecipeDetails(id);
        expect(recipe).toBeDefined();
        expect(recipe.id).toBe(id);
        expect(recipe).toEqual(mockRecipeDetails);
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