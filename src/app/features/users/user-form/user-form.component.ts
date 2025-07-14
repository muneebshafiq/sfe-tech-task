import { Component, inject, input, output, OutputEmitterRef, effect, signal } from '@angular/core';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { noTestValidator } from '../../../shared/validators/no-test.validator';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  user = input<User | null>();
  loading = input<boolean>(false);

  save: OutputEmitterRef<Partial<User>> = output();
  cancel: OutputEmitterRef<void> = output();

  private fb = inject(FormBuilder);
  
  isEditMode = signal<boolean>(false);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), noTestValidator()]],
    role: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    // Effect to handle user input changes (for edit mode)
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.isEditMode.set(true);
        this.form.patchValue({
          username: currentUser.username,
          role: currentUser.role,
          password: '' // Don't pre-fill password in edit mode
        });
        // Make password optional in edit mode
        this.form.get('password')?.setValidators([Validators.minLength(6)]);
      } else {
        this.isEditMode.set(false);
        this.form.reset();
        // Make password required in create mode
        this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      }
      this.form.get('password')?.updateValueAndValidity();
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const userData: Partial<User> = {
        username: formValue.username!,
        role: formValue.role!,
      };

      // Only include password if it's provided
      if (formValue.password && formValue.password.trim()) {
        userData.password = formValue.password;
      }

      // Include ID if editing
      if (this.user()?.id) {
        userData.id = this.user()!.id;
      }

      this.save.emit(userData);
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`;
    }
    if (field?.hasError('noTest')) {
      return field.errors?.['noTest'].message;
    }
    return '';
  }
}
