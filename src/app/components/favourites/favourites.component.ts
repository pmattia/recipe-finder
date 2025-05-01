import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { RecipeThumbComponent } from '../recipe-thumb/recipe-thumb.component';

@Component({
  selector: 'favourites',
  imports: [
    MatCard
    , MatButton
    , RouterModule
   , RecipeThumbComponent
  ],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {
  store = inject(RecipeFinderStore);

  onRemoveFavourite(recipe: RecipePreview) {
    this.store.removeFromFavourites(recipe.id);
  }
}
