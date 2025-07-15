import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

export const USERS_PATH = 'users'

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./users-list-page/users-list-page.component').then(c => c.UsersListPageComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./user-form-page/user-form-page.component').then(c => c.UserFormPageComponent),
    canActivate: [adminGuard]
  },
  {
    path: ':id',
    loadComponent: () => import('./user-form-page/user-form-page.component').then(c => c.UserFormPageComponent),
    canActivate: [adminGuard]
  }
]
