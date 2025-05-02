import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { HeaderComponent } from '../common/header/header.component';
import { RecipeCardComponent } from "../common/recipe-card/recipe-card.component";
import { SearchRecipeComponent } from '../common/search-recipe/search-recipe.component';
import { MatButton } from '@angular/material/button';

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
export class RecipeListComponent {
  recipes$: Observable<RecipePreview[]>;
  store = inject(RecipeFinderStore);
  router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.recipes$ = this.route.data.pipe(
      map(data => data['results'])
    );
  }
  
  goToDetails(id: string) {
    this.router.navigate(['recipe', id]);
  }
}

