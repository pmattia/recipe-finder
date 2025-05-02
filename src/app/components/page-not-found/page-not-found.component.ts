import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../common/header/header.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'page-not-found',
  imports: [HeaderComponent, MatIcon, RouterModule, MatButton
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {

}
