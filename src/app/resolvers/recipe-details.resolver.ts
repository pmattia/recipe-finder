import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeFinderStore } from '../store/recipe-finder.store';

@Injectable({
    providedIn: 'root',
})
export class RecipeDetailsResolver implements Resolve<Recipe> {
    store = inject(RecipeFinderStore);
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
        const id = route.paramMap.get('id');
        if (!id) {
            throw new Error('Recipe ID is required');
        }
        return this.store.getRecipeDetails(id);
    }
}