
import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeThumbComponent } from '../recipe-thumb/recipe-thumb.component';

@Component({
  selector: 'recipe-card',
  imports: [
    MatCard
    , MatButton
    , RecipeThumbComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  router = inject(Router);
  recipe = input.required<RecipePreview>();
  isLoading = false;

  onDetailClicked(id: string) {
    this.router.navigate(['recipe', id]);
    this.isLoading = true;
  }
}
