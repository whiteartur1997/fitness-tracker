import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter();
  isAuth: boolean;
  authSub: Subscription;

  constructor(private authService: AuthService) {
    this.isAuth = false;
    this.authSub = Subscription.EMPTY;
  }

  onLogout() {
    this.authService.logout();
    this.closeSidenav.emit();
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
