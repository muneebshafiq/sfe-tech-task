import { Component, inject, OnInit, signal } from '@angular/core';
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
  
  private readonly saveInProgress = signal(false);

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
    if (this.saveInProgress()) return;
    
    this.saveInProgress.set(true);
    const previousErrorState = this.error();
    
    this.facade.saveUser(user);
    
    // Monitor save completion
    const checkSaveComplete = () => {
      setTimeout(() => {
        if (!this.loading()) {
          this.saveInProgress.set(false);
          
          // If no error occurred (and error state didn't change), save was successful
          if (!this.error() || this.error() === previousErrorState) {
            this.goBack();
          }
        } else {
          checkSaveComplete();
        }
      }, 100);
    };
    
    checkSaveComplete();
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
