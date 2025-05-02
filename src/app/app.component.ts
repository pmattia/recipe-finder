import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeFinderStore } from './store/recipe-finder.store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
    , RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  private snackBar = inject(MatSnackBar);
  store = inject(RecipeFinderStore);
  errorSubscription: Subscription;

  constructor(private router: Router) { 
    this.errorSubscription = this.store.hasError$.subscribe((error) => {
      if (error) {
        this.openSnackBar(error, 'Restart');
      }
    });
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }).onAction().subscribe(() => {
      this.store.restart();
      this.router.navigate(['/']);
    });
  }
  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
