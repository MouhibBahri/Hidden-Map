import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from './services/leaderboard.service';
import { LeaderboardUser } from './models/leaderboard.model';
import { AuthService } from '../auth/services/auth.service';
import { APP_ROUTES } from '../config/app-routes.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent {
  readonly APP_ROUTES = APP_ROUTES;
  private leaderboardService = inject(LeaderboardService);
  private authService = inject(AuthService);

  users = signal<LeaderboardUser[]>([]);
  loading = signal(true);

  currentUserId = this.authService.getUserProfile()()?.id || '';

  constructor() {
    effect(() => {
      this.loadLeaderboard();
    });
  }

  loadLeaderboard() {
    this.loading.set(true);

    this.leaderboardService.getLeaderboard().subscribe({
      next: data => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  isCurrentUser(user: LeaderboardUser): boolean {
    return user.id === this.currentUserId;
  }
}
