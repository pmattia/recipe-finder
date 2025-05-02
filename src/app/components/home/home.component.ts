import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SearchRecipeComponent } from '../common/search-recipe/search-recipe.component';
import { StatefulComponent } from '../common/stateful.component';

@Component({
  selector: 'home',
  imports: [SearchRecipeComponent
    , MatButton
    , RouterModule
    , MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  extends StatefulComponent {
  
}
