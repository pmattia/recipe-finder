import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { RecipeCardComponent } from '../common/recipe-card/recipe-card.component';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../common/header/header.component';

@Component({
  selector: 'favourites',
  imports: [
     RouterModule
   ,MatIcon
   ,RecipeCardComponent
   ,HeaderComponent
   ,MatButton
   ,MatIcon
  ],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesComponent {
  store = inject(RecipeFinderStore);
  router = inject(Router);
  
  constructor() {
    this.store.clearSearchQuery();
  }

  onRemoveFavourite(recipe: RecipePreview) {
    this.store.removeFromFavourites(recipe.id);
  }

  goToDetails(id: string) {
    this.router.navigate(['recipe', id]);
  }
}
