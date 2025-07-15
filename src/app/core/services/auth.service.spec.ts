import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthResponse } from '../../shared/models/auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login user and store token', () => {
      const mockResponse: AuthResponse = {
        token: 'test-token',
        user: { id: 1, username: 'testuser', role: 'user' }
      };

      service.login('testuser', 'password').subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(service.getToken()).toBe('test-token');
        expect(service.isAuthenticated()).toBe(true);
      });

      const req = httpMock.expectOne('api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username: 'testuser', password: 'password' });
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should logout user and clear token', () => {
      // First set a token
      localStorage.setItem('auth_token', 'test-token');
      expect(service.isAuthenticated()).toBe(true);

      service.logout();

      expect(service.getToken()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('token management', () => {
    it('should return null when no token exists', () => {
      expect(service.getToken()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should return token when it exists', () => {
      localStorage.setItem('auth_token', 'test-token');
      expect(service.getToken()).toBe('test-token');
      expect(service.isAuthenticated()).toBe(true);
    });
  });
});
