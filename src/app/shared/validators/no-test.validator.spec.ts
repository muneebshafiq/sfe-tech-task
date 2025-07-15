import { FormControl } from '@angular/forms';
import { noTestValidator } from './no-test.validator';

describe('noTestValidator', () => {
  it('should return null for valid usernames', () => {
    const validator = noTestValidator();
    const control = new FormControl('john_doe');
    
    expect(validator(control)).toBeNull();
  });

  it('should return null for empty values', () => {
    const validator = noTestValidator();
    const control = new FormControl('');
    
    expect(validator(control)).toBeNull();
  });

  it('should return error for usernames containing "test"', () => {
    const validator = noTestValidator();
    const control = new FormControl('testuser');
    
    const result = validator(control);
    expect(result).toEqual({
      noTest: { message: 'Username cannot contain "test"' }
    });
  });

  it('should return error for usernames containing "TEST" (case insensitive)', () => {
    const validator = noTestValidator();
    const control = new FormControl('TESTuser');
    
    const result = validator(control);
    expect(result).toEqual({
      noTest: { message: 'Username cannot contain "test"' }
    });
  });

  it('should return error for usernames containing "Test" (mixed case)', () => {
    const validator = noTestValidator();
    const control = new FormControl('myTestAccount');
    
    const result = validator(control);
    expect(result).toEqual({
      noTest: { message: 'Username cannot contain "test"' }
    });
  });
});
