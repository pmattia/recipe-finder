import { TestBed } from '@angular/core/testing';
import { RECIPE_DETAILS_MOCK, RECIPES_PREVIEW_MOCK } from '../../mocks/mock-data';
import { RecipePreview } from '../models/recipe-preview.model';
import { RecipesService } from '../services/api.service';
import { RecipeFinderStore } from './recipe-finder.store';


describe('RecipeFinderStore', () => {

    let recipeService: jasmine.SpyObj<RecipesService>;

    const mockRecipesPreview = RECIPES_PREVIEW_MOCK;
    const mockRecipeDetails = RECIPE_DETAILS_MOCK;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('RecipeService', ['searchRecipe', 'getIngredients', 'getRecipeDetails']);
        await TestBed.configureTestingModule({
            providers: [
                RecipeFinderStore,
                { provide: RecipesService, useValue: spy }
            ]
        });

        recipeService = TestBed.inject(RecipesService) as jasmine.SpyObj<RecipesService>;
    });

    it('should be created', () => {
        const store = TestBed.inject(RecipeFinderStore);
        expect(store).toBeTruthy();
    });

    it('should initialize with default state', () => {
        const store = TestBed.inject(RecipeFinderStore);
        expect(store.searchQuery()).toBeUndefined();
        expect(store.loading()).toBeFalse();
        expect(store.favouriteRecipes()).toEqual([]);
    });

    describe('searchRecipe', () => {
        beforeEach(() => {
            recipeService.searchRecipe.and.returnValue(Promise.resolve(mockRecipesPreview));
        });

        it('should search recipes', async () => {
            const store = TestBed.inject(RecipeFinderStore);
            const recipes = await store.searchRecipe('chicken');

            expect(recipeService.searchRecipe).toHaveBeenCalledWith('chicken');
            expect(recipes).toEqual(mockRecipesPreview);
            expect(store.loading()).toBeFalse();
        });

        it('should set loading state while fetching data', async () => {
            const store = TestBed.inject(RecipeFinderStore);
            const loadPromise = store.searchRecipe('chicken');
            expect(store.loading()).toBeTrue();
            await loadPromise;
            expect(store.loading()).toBeFalse();
        });
        
        it('should set search query state', async () => {
            const store = TestBed.inject(RecipeFinderStore);
            const loadPromise = store.searchRecipe('chicken');
            await loadPromise;
            expect(store.searchQuery()).toEqual('chicken');
        });
    });
    describe('getRecipeDetails', () => {
        beforeEach(() => {
            recipeService.getRecipeDetails.and.returnValue(Promise.resolve(mockRecipeDetails));
        });

        it('should get recipe details', async () => {
            const store = TestBed.inject(RecipeFinderStore);
            const recipe = await store.getRecipeDetails('123');

            expect(recipeService.getRecipeDetails).toHaveBeenCalledWith('123');
            expect(recipe).toEqual(mockRecipeDetails);
            expect(store.loading()).toBeFalse();
        });

        it('should set loading state while fetching data', async () => {
            const store = TestBed.inject(RecipeFinderStore);
            const loadPromise = store.getRecipeDetails('123');
            expect(store.loading()).toBeTrue();
            await loadPromise;
            expect(store.loading()).toBeFalse();
        });
    });
    describe('addToFavourites', () => {
        it('should add recipe to favourites', () => {
            const store = TestBed.inject(RecipeFinderStore);
            const recipePreview: RecipePreview = {
                                    id: mockRecipeDetails.id,
                                    name: mockRecipeDetails.name,
                                    thumb: mockRecipeDetails.thumb,
                                    category: mockRecipeDetails.category,
                                };
            store.addToFavourites(mockRecipeDetails);
            expect(store.favouriteRecipes()).toContain(recipePreview);
        });

        it('should not add duplicate recipe to favourites', () => {
            const store = TestBed.inject(RecipeFinderStore);
            store.addToFavourites(mockRecipeDetails);
            store.addToFavourites(mockRecipeDetails); // Adding the same recipe again
            expect(store.favouriteRecipes().length).toBe(1); // Should still be 1
        });
    });
    describe('removeFromFavourites', () => {
        it('should remove recipe from favourites', () => {
            const store = TestBed.inject(RecipeFinderStore);
            store.addToFavourites(mockRecipeDetails);
            store.removeFromFavourites(mockRecipeDetails.id);
            expect(store.favouriteRecipes()).not.toContain(mockRecipeDetails);
        });

        it('should not throw error if recipe is not in favourites', () => {
            const store = TestBed.inject(RecipeFinderStore);
            const recipe = mockRecipeDetails;
            expect(() => store.removeFromFavourites(recipe.id)).not.toThrow();
        });
    });
});