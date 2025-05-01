import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeThumbComponent } from '../recipe-thumb/recipe-thumb.component';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'recipe-list',
  imports: [
    MatCard
    , MatButton
    , RouterModule
    , AsyncPipe
    , RecipeThumbComponent
    , MatProgressSpinner
    , MatIcon
    , MatRipple
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

