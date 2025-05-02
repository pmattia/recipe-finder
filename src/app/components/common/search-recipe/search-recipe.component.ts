import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatIconButton } from '@angular/material/button';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { RecipePreview } from '../../../models/recipe-preview.model';
import { RecipeFinderStore } from '../../../store/recipe-finder.store';
import { HighlightKeywordPipe } from './highlight-keyword.pipe';

@Component({
  selector: 'search-recipe',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
    , MatAutocompleteModule
    , MatIcon
    , MatSuffix
    , AsyncPipe
    , MatProgressSpinner
    , RouterModule
    , HighlightKeywordPipe
  , MatIconButton],
  templateUrl: './search-recipe.component.html',
  styleUrl: './search-recipe.component.scss'
})
export class SearchRecipeComponent {
  private router = inject(Router);
  store = inject(RecipeFinderStore);

  searchInput = new FormControl('');
  suggestedRecipes$: Observable<RecipePreview[]>;
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  constructor() {
    this.suggestedRecipes$ = this.searchInput.valueChanges
      .pipe(
        map(value => this.sanitizedInput(value)), //sanitize the input value
        debounceTime(500),
        switchMap(value => {
          if (!value || value.length < 3) {
            return of([]);
          }
          return this.store.searchRecipe(value).then(res => res);
        })
      )
  }

  onSearchRecipe(query: string) {
    const sanitizedQuery = this.sanitizedInput(query);
    if (sanitizedQuery && sanitizedQuery.length > 0) {
      this.router.navigate([`/recipes/${sanitizedQuery}`]);
      if(this.autocomplete) this.autocomplete.closePanel();
    }
  }

  onSelectSuggestion(recipe: RecipePreview) {
    this.router.navigate([`/recipe/${recipe.id}`]);
  }

  onClearQuery(){
    this.searchInput.setValue('');
    this.store.clearSearchQuery();
  }

  private sanitizedInput(value: string | null): string {
    if (!value) return '';
    const trimmedValue = value?.trimStart().trimEnd();
    const sanitizedValue = trimmedValue.replace(/[^a-zA-Z0-9\s]/g, '');
    // Sanitize the input by escaping HTML special characters
    return sanitizedValue
    .replace(/&/g, '')
    .replace(/</g, '')
    .replace(/>/g, '')
    .replace(/"/g, '')
    .replace(/'/g, '');
  }
}
