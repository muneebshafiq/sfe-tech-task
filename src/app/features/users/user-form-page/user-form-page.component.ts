import { Component, inject, OnInit } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../../shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersFacadeService } from '../../../core/facades/users-facade.service';

@Component({
  selector: 'app-user-form-page',
  imports: [
    UserFormComponent
  ],
  templateUrl: './user-form-page.component.html',
  styleUrl: './user-form-page.component.scss'
})
export class UserFormPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private facade = inject(UsersFacadeService);

  user = this.facade.user;
  loading = this.facade.loading;
  error = this.facade.error;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      // Load user for editing
      this.facade.loadUser(+userId);
    } else {
      // Clear user for creating new one
      this.facade.clearUser();
    }
  }

  handleSave(user: Partial<User>) {
    this.facade.saveUser(user);
    
    // Navigate back after successful save
    // Note: In a real app, you might want to wait for the save to complete
    // For now, we'll navigate immediately
    setTimeout(() => {
      if (!this.error()) {
        this.goBack();
      }
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
