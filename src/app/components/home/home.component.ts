import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { RecipePreview } from '../../models/recipe-preview.model';
import { SearchRecipeComponent } from '../common/search-recipe/search-recipe.component';
import { StatefulComponent } from '../common/stateful.component';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'home',
  imports: [SearchRecipeComponent
    , MatButton
    , RouterModule
    , MatIcon
    , AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends StatefulComponent implements OnInit {
  router = inject(Router);
  suggestedRecipes$: Observable<RecipePreview[]>;

  constructor() {
    super();
    this.suggestedRecipes$ = this.store.lastRecipes$;
  }
  ngOnInit(): void {
    this.store.clearLastQuery();
  }

  searchQueryChanges(query: string) {
    if (query !== this.store.lastQuery()) {
      this.store.searchRecipe(query);
    }
  }

  onSubmit(query: string){
    this.router.navigate([`/recipes/${query}`]);
  }

  onSuggestionSelected(recipe: RecipePreview){
    this.router.navigate([`/recipe/${recipe.id}`]);
  }

  onSearchClear(){
    this.store.clearLastQuery();
  }
}
