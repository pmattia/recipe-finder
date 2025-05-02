import { IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'recipe-thumb',
  imports: [
    NgOptimizedImage
    , RouterModule
    , MatRipple
  , MatProgressSpinner],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40
      }
    },
  ],
  templateUrl: './recipe-thumb.component.html',
  styleUrl: './recipe-thumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeThumbComponent implements OnInit {
  imageHeight = input<number>(250);
  imgSrc = input.required<string>();
  imgAlt = input<string>('');
  loading = input<boolean>(false);
  onClick = output<void>();
  hasPriority = input<boolean>(false);

  ngOnInit() {
    if (!this.onClick) {
      console.warn('Warning: onClick output is not defined.');
    }
  }
  onImageClick() {
    this.onClick.emit();
  }
}
