import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeFinderStore } from '../store/recipe-finder.store';
import { RecipeDetailsResolver } from './recipe-details.resolver';
import { of } from 'rxjs';

describe('RecipeDetailsResolver', () => {
    let resolver: RecipeDetailsResolver;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                RecipeDetailsResolver,
                { provide: RecipeFinderStore },
            ],
        });

        resolver = TestBed.inject(RecipeDetailsResolver);
    });

    it('should throw an error and call notifyError when id is missing', () => {
        const route = new ActivatedRouteSnapshot();
        const state = {} as RouterStateSnapshot;

        const mockStore = TestBed.inject(RecipeFinderStore);

        // Simulate a missing 'id' parameter
        spyOn(route.paramMap, 'get').and.returnValue(null);

        expect(() => resolver.resolve(route, state)).toThrowError('Recipe ID is required');
        expect(mockStore.error()).toBe('OOOoopppss! An error occurred!');
    });

    it('should call getRecipeDetails when id is provided', () => {
        const route = new ActivatedRouteSnapshot();
        const state = {} as RouterStateSnapshot;
    
        // Mock the RecipeFinderStore
        const mockStore = TestBed.inject(RecipeFinderStore);
        spyOn(mockStore, 'getRecipeDetailsAsync').and.returnValue(Promise.resolve({
            id: '123',
            name: 'Test Recipe',
            area: 'Test Area',
            instructions: 'Test Instructions',
            tags: 'Test Tags',
            youtube: 'https://youtube.com/test',
            thumb: 'https://example.com/test.jpg',
            category: 'Test Category',
            ingredients: [],
          }));
    
        // Simulate a valid 'id' parameter
        spyOn(route.paramMap, 'get').and.returnValue('123');
    
        const result = resolver.resolve(route, state);
    
        expect(mockStore.getRecipeDetailsAsync).toHaveBeenCalledWith('123');
        expect(result).toBeTruthy();
    });
});