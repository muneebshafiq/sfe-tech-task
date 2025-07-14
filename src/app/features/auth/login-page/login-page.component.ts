import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatCard,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  error: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.error.set('');

      const { username, password } = this.form.value;

      this.authService.login(username!, password!).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set(err.error?.message || 'Login failed. Please try again.');
        }
      });
    }
  }
}
