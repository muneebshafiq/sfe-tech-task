import { Component, inject, OnInit } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsersFacadeService } from '../../../core/facades/users-facade.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-list-page',
  imports: [
    UsersListComponent,
    MatButton,
    MatIconModule
  ],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss'
})
export class UsersListPageComponent implements OnInit {
  facade = inject(UsersFacadeService);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.facade.loadUsers();
  }

  goToNew(): void {
    this.router.navigate(['/users/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/users', id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
