import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { AfterContentInit, Component, ElementRef, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HeaderComponent } from '../header/header.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RecipeThumbComponent } from '../recipe-thumb/recipe-thumb.component';
import { MatCard } from '@angular/material/card';
import { RecipeInstructionsPipe } from './recipe-instructions.pipe';

@Component({
  selector: 'recipe-details',
  imports: [AsyncPipe
    , MatIcon
    , RouterModule
    , MatProgressSpinner
    ,HeaderComponent
    ,MatButton
    ,MatIconButton
    ,RecipeThumbComponent
    ,MatCard,
    RecipeInstructionsPipe
  ],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
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
