import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserStore } from '../../../core/stores/users.store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private userStore = inject(UserStore);

  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.userStore.currentUser;

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
