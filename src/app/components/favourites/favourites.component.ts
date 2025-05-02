import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { HeaderComponent } from '../header/header.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'favourites',
  imports: [
     RouterModule
   ,MatIcon
   ,RecipeCardComponent
   ,MatProgressSpinner
   ,HeaderComponent
  ],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {
  store = inject(RecipeFinderStore);
  
  constructor() {
    this.store.clearSearchQuery();
  }

  onRemoveFavourite(recipe: RecipePreview) {
    this.store.removeFromFavourites(recipe.id);
  }
}
