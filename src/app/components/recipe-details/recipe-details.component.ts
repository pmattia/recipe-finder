import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { HeaderComponent } from '../common/header/header.component';
import { RecipeThumbComponent } from '../common/recipe-thumb/recipe-thumb.component';
import { RecipeInstructionsPipe } from './recipe-instructions.pipe';

@Component({
  selector: 'recipe-details',
  imports: [AsyncPipe
    , MatIcon
    , RouterModule
    ,HeaderComponent
    ,MatButton
    ,MatIconButton
    ,RecipeThumbComponent
    ,MatCard,
    RecipeInstructionsPipe
  ],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsComponent {
  recipe$: Observable<Recipe>;
  store = inject(RecipeFinderStore);

  constructor(private route: ActivatedRoute) {
    this.recipe$ = this.route.data.pipe(
      map((data) => data['recipe'])
    );
  }
  onAddFavourite(recipe: Recipe) {
    this.store.addToFavourites(recipe);
  }

  onRemoveFavourite(recipe: Recipe) {
    this.store.removeFromFavourites(recipe.id);
  }

  onPlayTutorialClick(recipe: Recipe) {
    window.open(recipe.youtube, '_blank');
  }
}
