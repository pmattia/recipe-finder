import { AfterContentInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RecipeFinderStore } from './store/recipe-finder.store';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
    , RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterContentInit {
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
  ngAfterContentInit(): void {
    console.log('AppComponent content initialized');
    this.store.restart();
  }

  ngOnInit(): void {
    // console.log('AppComponent initialized');
    // this.store.restart();
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
