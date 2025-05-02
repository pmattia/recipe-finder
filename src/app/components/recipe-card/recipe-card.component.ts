
import { Component, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { RecipeThumbComponent } from '../recipe-thumb/recipe-thumb.component';
import { RecipePreview } from '../../models/recipe-preview.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'recipe-card',
  imports: [
    MatCard
  ,RouterModule
  , MatButton
,RecipeThumbComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  recipe = input.required<RecipePreview>();
}
