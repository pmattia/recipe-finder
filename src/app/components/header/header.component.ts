import { Component, inject } from '@angular/core';
import { RecipeFinderStore } from '../../store/recipe-finder.store';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterModule
    ,MatButton
    ,MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  store = inject(RecipeFinderStore);
}
