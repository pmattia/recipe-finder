import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { HeaderComponent } from '../common/header/header.component';
import { RecipeThumbComponent } from '../common/recipe-thumb/recipe-thumb.component';
import { StatefulComponent } from '../common/stateful.component';
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
export class RecipeDetailsComponent extends StatefulComponent implements OnInit {
  recipe$: Observable<Recipe>;

  constructor(private route: ActivatedRoute) {
    super();
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

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
