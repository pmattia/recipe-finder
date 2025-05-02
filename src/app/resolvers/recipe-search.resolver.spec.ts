import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeFinderStore } from '../store/recipe-finder.store';
import { RecipeSearchResolver } from './recipe-search.resolver';

describe('RecipeSearchResolver', () => {
  let resolver: RecipeSearchResolver;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        RecipeSearchResolver,
        { provide: RecipeFinderStore },
      ],
    });

    resolver = TestBed.inject(RecipeSearchResolver);
  });

  it('should throw an error and call notifyError when query is missing', () => {
    const route = new ActivatedRouteSnapshot();
    const state = {} as RouterStateSnapshot;

    const mockStore = TestBed.inject(RecipeFinderStore);

    // Simulate a missing 'query' parameter
    spyOn(route.paramMap, 'get').and.returnValue(null);

    expect(() => resolver.resolve(route, state)).toThrowError('Recipe ID is required');
    expect(mockStore.error()).toBe('OOOoopppss! An error occurred!');
  });
});