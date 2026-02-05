import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterLinkWithHref,
} from '@angular/router';
import { APP_ROUTES } from '../config/app-routes.config';
import { AuthService } from '../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from '../shared/services/notifications.service';
import { NotificationsDropdownComponent } from '../notifications/notifications-dropdown/notifications-dropdown.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterLinkWithHref, NotificationsDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly APP_ROUTES = APP_ROUTES;
  authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private notificationsService = inject(NotificationsService);

  isMenuOpen = signal(false);
  user = this.authService.getUserProfile();
  
  // Expose notification signals to template
  unreadCount = this.notificationsService.unreadCount;
  hasUnread = this.notificationsService.hasUnread;
  currentUserProfile$ = this.authService.getProfile();
  
  private pollingSubscription?: Subscription;
  
  ngOnInit() {
    this.loadUserData();
    
    // Subscribe to router events to refresh navbar after navigation
    this.router.events.subscribe(() => {
      if (this.authService.isAuthenticated() && !this.user()) {
        this.loadUserData();
      }
    });
  }
  
  private loadUserData() {
    if (this.authService.isAuthenticated()) {
      this.authService.fetchAndStoreProfile().subscribe({
        error: (err) => {
          console.error('Failed to fetch profile:', err);
        },
      });
      
      // Load notifications initially
      this.notificationsService.getNotifications().subscribe();
      
      // Start polling for new notifications every 10 seconds
      this.pollingSubscription = this.notificationsService.startPolling(10000).subscribe({
        error: (err) => {
          console.error('Error polling notifications:', err);
        },
      });
    }
  }

  ngOnDestroy() {
    // Clean up polling subscription when component is destroyed
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.toastr.info('Goodbye! See you soon.');
    this.router.navigate([APP_ROUTES.app.home]).then(() => {
      window.location.reload();
    });
  }
}
