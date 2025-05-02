import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'page-error',
  imports: [HeaderComponent, MatIcon, RouterModule, MatButton],
  templateUrl: './page-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageErrorComponent {

}
