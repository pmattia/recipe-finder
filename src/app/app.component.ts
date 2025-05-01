import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RecipeFinderStore } from './store/recipe-finder.store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
    , RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) { }
  
  store = inject(RecipeFinderStore);

  onRestart(){
    this.store.restart();
    this.router.navigate(['/']);
  }
}
