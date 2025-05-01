import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { debounceTime, Observable, of, switchMap } from 'rxjs';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';

@Component({
  selector: 'home',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
    , MatAutocompleteModule
    , MatIcon
    , MatSuffix
    , MatLabel
    , AsyncPipe
    , MatProgressSpinner],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);
  store = inject(RecipeFinderStore);

  searchInput = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  suggestedRecipes$: Observable<RecipePreview[]>;

  constructor() {
    this.suggestedRecipes$ = this.searchInput.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => {
        if (!value || value.length < 3) {
          return of([]); 
        }
        return this.store.searchRecipe(value).then(res => res);
      })
    );
  }

  onSearchRecipe(query: string) {
    if (query && query.length > 0) {
      this.router.navigate([`/recipes/${query}`]);
    }
  }

  onSelectSuggestion(recipe: RecipePreview) {
    this.router.navigate([`/recipe/${recipe.id}`]);
  }
}
