import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() openSidenav = new EventEmitter();
  isAuth: boolean;
  authSub: Subscription;
  constructor(private authService: AuthService) {
    this.isAuth = false;
    this.authSub = Subscription.EMPTY;
  }

  ngOnInit() {
    this.authSub = this.authService.userChanged.subscribe(value => {
      this.isAuth = Boolean(value);
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
