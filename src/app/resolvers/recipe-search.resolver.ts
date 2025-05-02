import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipePreview } from '../models/recipe-preview.model';
import { RecipeFinderStore } from '../store/recipe-finder.store';

@Injectable({
    providedIn: 'root',
})
export class RecipeSearchResolver implements Resolve<RecipePreview[]> {
    store = inject(RecipeFinderStore);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipePreview[]> | Promise<RecipePreview[]> | RecipePreview[] {
        const query = route.paramMap.get('query');
        if(!query){
            this.store.notifyError('OOOoopppss! An error occurred!');
            throw new Error('Recipe ID is required');
        }
        return this.store.searchRecipe(query); // Call the searchRecipe method from the store
    }
}