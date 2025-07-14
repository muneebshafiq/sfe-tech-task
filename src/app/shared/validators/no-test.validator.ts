import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noTestValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && typeof value === 'string' && value.toLowerCase().includes('test')) {
      return { noTest: { message: 'Username cannot contain "test"' } };
    }
    return null;
  };
}
