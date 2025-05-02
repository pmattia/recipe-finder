import { inject } from "@angular/core";
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState, withProps } from '@ngrx/signals';
import { RecipePreview } from "../models/recipe-preview.model";
import { Recipe } from "../models/recipe.model";
import { RecipesService } from "../services/api.service";
import { LocalStorageService } from "../services/local-storage.service";
import { SessionStorageService } from "../services/session-storage.service";
import { withStorageSync } from "./features/with-storage-sync";

type RecipeFinderState = {
    loading: boolean;
    favouriteRecipes: RecipePreview[];
    searchQuery: string | undefined;
    error: string | undefined;
};

const initialState: RecipeFinderState = {
    loading: false,
    favouriteRecipes: [],
    searchQuery: undefined,
    error: undefined,
};

const storageKey = 'recipe-finder';

export const RecipeFinderStore = signalStore(
    { providedIn: 'root' }, //this is a signleton service
    withState(initialState),
    withProps(({ error }) => ({
        hasError$: toObservable(error)
      })),
    withMethods(
        (store, recipeService = inject(RecipesService)) => ({
            async searchRecipe(query: string) {
                patchState(store, { loading: true });
                try {
                    const recipes = await recipeService.searchRecipe(query);
                    patchState(store, { loading: false, searchQuery: query });
                    return recipes;
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                    patchState(store, { loading: false, error: 'Failed to fetch recipes' });
                    return [];
                }
            },
            async getRecipeDetails(id: string): Promise<Recipe> {
                patchState(store, { loading: true });
                try {
                    const recipe = await recipeService.getRecipeDetails(id);
                    patchState(store, { loading: false });
                    return recipe;
                }
                catch (error) {
                    console.error('Error fetching recipe details:', error);
                    patchState(store, { loading: false, error: 'Failed to fetch recipe details' });
                    return {} as Recipe;
                }
            },
            addToFavourites(recipe: Recipe) {
                const currentFavourites = store.favouriteRecipes();
                if (!currentFavourites.some((r) => r.id === recipe.id)) {
                    const recipePreview: RecipePreview = {
                        id: recipe.id,
                        name: recipe.name,
                        thumb: recipe.thumb,
                        category: recipe.category,
                    };

                    patchState(store, { favouriteRecipes: [...currentFavourites, recipePreview] });
                }
            },
            removeFromFavourites(id: string) {
                const currentFavourites = store.favouriteRecipes();
                const updatedFavourites = currentFavourites.filter((r) => r.id !== id);
                patchState(store, { favouriteRecipes: updatedFavourites });
            },
            isRecipeFavourite(id: string): boolean {
                const currentFavourites = store.favouriteRecipes();
                return currentFavourites.some((r) => r.id === id);
            },
            clearSearchQuery() {
                patchState(store, { searchQuery: undefined });
            },
            restart(){
                patchState(store, {error: undefined, loading: false, searchQuery: undefined});
            }
        })
    ),
    withStorageSync(storageKey, LocalStorageService, (state: RecipeFinderState) => ({
        favouriteRecipes: state.favouriteRecipes,
    })),
    withStorageSync(storageKey, SessionStorageService, (state: RecipeFinderState) => ({
        searchQuery: state.searchQuery,
        loading: state.loading,
    })),
)
