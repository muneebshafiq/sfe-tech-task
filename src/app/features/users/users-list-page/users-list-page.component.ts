import { Component, inject, OnInit } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsersFacadeService } from '../../../core/facades/users-facade.service';
import { UserStore } from '../../../core/stores/users.store';
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
  userStore = inject(UserStore);
  router = inject(Router);

  currentUser = this.userStore.currentUser;

  ngOnInit(): void {
    this.facade.loadUsers();
  }

  goToNew(): void {
    this.router.navigate(['/users/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/users', id]);
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }
}
