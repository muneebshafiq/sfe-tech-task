import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStore } from '../stores/users.store';

export const adminGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  
  const currentUser = userStore.currentUser();
  
  if (currentUser && currentUser.role === 'admin') {
    return true;
  } else {
    // Redirect to users list if not admin
    router.navigate(['/users']);
    return false;
  }
};
