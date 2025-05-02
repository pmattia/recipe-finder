
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { RecipeThumbComponent } from '../recipe-thumb/recipe-thumb.component';

@Component({
  selector: 'recipe-card',
  imports: [
    MatCard
    , MatButton
    , RecipeThumbComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCardComponent {
  
  id = input.required<string>();
  thumb = input.required<string>();
  name = input.required<string>();
  category = input.required<string>();
  imageHasPriority = input<boolean>(false);
  isLoading = false;
  onDetailClick = output<string>();

  onDetailClicked(id: string) {
    this.isLoading = true;
    this.onDetailClick.emit(id);
  }
}
