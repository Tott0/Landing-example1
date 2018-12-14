import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from '../core/providers/auth.service';
import { UserType } from '../shared/models/user.model';
import { AppConstants } from '@app/app-constants';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('fixedHeader', { read: ElementRef }) fixedHeader: ElementRef;
  headerIsFixed = false;

  UserType = UserType;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit() {

    // scroll listener
    const scrollSub = fromEvent(window, 'scroll').subscribe(event => {
      if (!this.fixedHeader) {
        return;
      }
      const zoomLimit = window.getComputedStyle(document.documentElement).getPropertyValue('--top-header-height').replace('px', '');
      const currentClass = this.fixedHeader.nativeElement.className;
      if (window.scrollY > +zoomLimit) {
        if (!this.headerIsFixed) {
          this.headerIsFixed = true;
          this.fixedHeader.nativeElement.className += ' is-fixed';
        }
      } else {
        this.headerIsFixed = false;
        this.fixedHeader.nativeElement.className = currentClass.replace(' is-fixed', '');
      }
      console.log(this.fixedHeader);
    });
  }

  isLoggedIn() {
    return this.authService.user;
  }

  home() {
    this.router.navigate(['/']);
  }

  canShow(permission: number) {
    if (this.authService.user) {
      const r = this.authService.user.role;
      switch (permission) {
        case 1:
          return UserType.ADMIN === this.authService.user.user.typeUser;
        case 2:
          return this.authService.user.user.typeUser >= UserType.CLIENT;
        case 3:
          return this.authService.user.user.typeUser >= UserType.RENTER;
      }

      switch (r) {
        case UserType.ADMIN:
          return permission >= 1 ? true : false;
        case UserType.CLIENT:
          return permission >= 2 ? true : false;
        case UserType.RENTER:
          return permission >= 3 ? true : false;
      }
    } else {
      if (permission === 0) {
        return true;
      } else {
        return false;
      }
    }

  }

  isAtLanding() {
    return AppConstants.isAtLanding;
  }
}
