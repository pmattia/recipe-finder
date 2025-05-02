import { ChangeDetectionStrategy, Component, input, output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatIconButton } from '@angular/material/button';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { debounceTime, map, of, tap } from 'rxjs';
import { RecipePreview } from '../../../models/recipe-preview.model';
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
    , MatProgressSpinner
    , RouterModule
    , HighlightKeywordPipe
  , MatIconButton],
  templateUrl: './search-recipe.component.html',
  styleUrl: './search-recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRecipeComponent {
  searchInput = new FormControl('');

  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  suggestedRecipes = input<RecipePreview[] | null>([]);
  searchQuery = input<string | undefined>('');
  isLoading = input<boolean>(false);

  searchQueryChanges = output<string>();
  onSubmit = output<string>();
  onSuggestionSelected = output<RecipePreview>();
  onClear = output();

  constructor() {
    this.searchInput.valueChanges
      .pipe(
        map(value => this.sanitizedInput(value)), //sanitize the input value
        debounceTime(500)
      ).subscribe(value => {
        if (!value || value.length < 3) {
          return of([]);
        }
        return this.searchQueryChanges.emit(value);
      })
  }

  onSearchRecipe(query: string) {
    const sanitizedQuery = this.sanitizedInput(query);
    if (sanitizedQuery && sanitizedQuery.length > 0) {
      if(this.autocomplete) this.autocomplete.closePanel();
      this.onSubmit.emit(sanitizedQuery);
    }
  }

  onSelectSuggestion(recipe: RecipePreview) {
    this.onSuggestionSelected.emit(recipe);
  }

  onClearQuery(){
    this.searchInput.setValue('');
    this.onClear.emit();
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
