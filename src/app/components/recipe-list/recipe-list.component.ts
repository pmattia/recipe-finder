import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RecipePreview } from '../../models/recipe-preview.model';
import { HeaderComponent } from '../common/header/header.component';
import { RecipeCardComponent } from "../common/recipe-card/recipe-card.component";
import { SearchRecipeComponent } from '../common/search-recipe/search-recipe.component';
import { StatefulComponent } from '../common/stateful.component';

@Component({
  selector: 'recipe-list',
  imports: [
    RouterModule,
    AsyncPipe,
    MatIcon,
    RecipeCardComponent,
    SearchRecipeComponent,
    HeaderComponent,
    MatIcon,
    MatButton
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent extends StatefulComponent {
  recipes$: Observable<RecipePreview[]>;
  suggestedRecipes$: Observable<RecipePreview[]>;
  router = inject(Router);

  constructor(private route: ActivatedRoute) {
    super();
    this.recipes$ = this.route.data.pipe(
      map(data => data['results'])
    );
    
    this.suggestedRecipes$ = this.store.lastRecipes$;
  }

  goToDetails(id: string) {
    this.router.navigate(['recipe', id]);
  }

  searchQueryChanges(query: string) {
    if (query !== this.store.lastQuery()) {
      this.store.searchRecipe(query);
    }
  }

  onSubmit(query: string) {
    this.router.navigate([`/recipes/${query}`]);
  }

  onSuggestionSelected(recipe: RecipePreview) {
    this.router.navigate([`/recipe/${recipe.id}`]);
  }

  onSearchClear() {
    this.store.clearLastQuery();
  }
}

