import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { HeaderComponent } from '../header/header.component';
import { RecipeCardComponent } from "../recipe-card/recipe-card.component";
import { SearchRecipeComponent } from '../search-recipe/search-recipe.component';

@Component({
  selector: 'recipe-list',
  imports: [
    RouterModule,
    AsyncPipe,
    MatProgressSpinner,
    MatIcon,
    RecipeCardComponent,
    SearchRecipeComponent,
    HeaderComponent
],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  recipes$: Observable<RecipePreview[]>;
  store = inject(RecipeFinderStore);

  constructor(private route: ActivatedRoute) {
    this.recipes$ = this.route.data.pipe(
      map(data => data['results'])
    );
  }
}

