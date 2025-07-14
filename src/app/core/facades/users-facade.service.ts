import { inject, Injectable } from '@angular/core';
import { UserStore } from '../stores/users.store';
import { UsersService } from '../services/users.service';
import { User } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class UsersFacadeService {
  private store = inject(UserStore);
  private api = inject(UsersService);

  users = this.store.users.asReadonly();
  user = this.store.user.asReadonly();
  loading = this.store.loading.asReadonly();
  error = this.store.error.asReadonly();

  loadUsers(): void {
    this.store.setLoading(true);
    this.api.getUsers().subscribe({
      next: users => {
        this.store.setUsers(users);
        this.store.setError('');
        this.store.setLoading(false);
      },
      error: err => {
        this.store.setError('Failed to load users');
        this.store.setLoading(false);
      }
    });
  }

  loadUser(id: number): void {
    this.store.setLoading(true);
    this.api.getUserById(id).subscribe({
      next: user => {
        this.store.setUser(user);
        this.store.setError('');
        this.store.setLoading(false);
      },
      error: err => {
        this.store.setError('Failed to load user');
        this.store.setLoading(false);
      }
    });
  }

  clearUser(): void {
    this.store.setUser(null);
  }

  saveUser(user: Partial<User>): void {
    const action = user.id ? this.api.editUser(user) : this.api.addUser(user);
    this.store.setLoading(true);

    action.subscribe({
      next: (saved) => {
        this.store.upsertUser(saved);
        this.store.setError('');
        this.store.setLoading(false);
      },
      error: (err) => {
        this.store.setError(err.error?.message || 'Failed to save user');
        this.store.setLoading(false);
      }
    });
  }
}
