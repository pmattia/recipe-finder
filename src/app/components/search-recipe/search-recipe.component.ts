import { AsyncPipe } from '@angular/common';
import { Component, inject, SecurityContext, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { Observable, debounceTime, switchMap, of } from 'rxjs';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { DomSanitizer } from '@angular/platform-browser';
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
,HighlightKeywordPipe],
  templateUrl: './search-recipe.component.html',
  styleUrl: './search-recipe.component.scss'
})
export class SearchRecipeComponent {
  private router = inject(Router);
  store = inject(RecipeFinderStore);
  sanitizer = inject(DomSanitizer);

  searchInput = new FormControl('');
  suggestedRecipes$: Observable<RecipePreview[]>;
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;
  
  constructor() {
    this.suggestedRecipes$ = this.searchInput.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => {
        if (!value || value.length < 3) {
          return of([]); 
        }
        const sanitizedValue = this.sanitizer.sanitize(SecurityContext.HTML, value) || '';
        return this.store.searchRecipe(sanitizedValue).then(res => res);
      })
    );
  }

  onSearchRecipe(query: string) {
    if (query && query.length > 0) {
      this.router.navigate([`/recipes/${query}`]);
      this.autocomplete.closePanel();
    }
  }

  onSelectSuggestion(recipe: RecipePreview) {
    this.router.navigate([`/recipe/${recipe.id}`]);
  }
}
