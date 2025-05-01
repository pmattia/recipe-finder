import { Component, inject } from '@angular/core';
import { SearchRecipeComponent } from '../search-recipe/search-recipe.component';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'home',
  imports: [SearchRecipeComponent
    , MatButton
    , RouterModule
    , MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  store = inject(RecipeFinderStore);
}
