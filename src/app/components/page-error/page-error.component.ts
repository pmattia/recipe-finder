import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'page-error',
  imports: [HeaderComponent, MatIcon, RouterModule, MatButton],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss'
})
export class PageErrorComponent {

}
