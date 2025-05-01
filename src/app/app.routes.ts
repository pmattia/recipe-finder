import { Routes } from '@angular/router';
import { RecipeDetailsResolver } from './resolvers/recipe-details.resolver';
import { RecipeSearchResolver } from './resolvers/recipe-search.resolver';

export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent), 
    },
    {
        path: 'recipes/:query', 
        loadComponent: () => import('./components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent), 
        resolve: {
            results: RecipeSearchResolver, // Attach the resolver
        },
    },
    {
        path: 'recipe/:id', 
        loadComponent: () => import('./components/recipe-details/recipe-details.component').then(m => m.RecipeDetailsComponent),
        resolve: {
            recipe: RecipeDetailsResolver, // Attach the resolver
        },
    },
    {
        path: 'favourites', 
        loadComponent: () => import('./components/favourites/favourites.component').then(m => m.FavouritesComponent)
    },
    {
        path: 'error', 
        loadComponent: () => import('./components/page-error/page-error.component').then(m => m.PageErrorComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./components/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent), // Load the PageNotFoundComponent for any unmatched routes
    }
];
