import { IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RouterModule } from '@angular/router';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'recipe-thumb',
  imports: [
    NgOptimizedImage
  ,RouterModule
,MatRipple],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40,
        breakpoints: [384, 640, 750]
      }
    },
  ],
  templateUrl: './recipe-thumb.component.html',
  styleUrl: './recipe-thumb.component.scss'
})
export class RecipeThumbComponent {
  imageHeight = input<number>(250);
  recipe = input.required<RecipePreview>()
}
