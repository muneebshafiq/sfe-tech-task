import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../core/services/auth.service';
import { UserStore } from '../../../core/stores/users.store';
import { signal } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserStore: jasmine.SpyObj<UserStore>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      isAuthenticated: signal(false)
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const userStoreSpy = jasmine.createSpyObj('UserStore', [], {
      currentUser: signal(null)
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserStore, useValue: userStoreSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockUserStore = TestBed.inject(UserStore) as jasmine.SpyObj<UserStore>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to users page', () => {
    component.navigateToUsers();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should navigate to login page', () => {
    component.navigateToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should logout and navigate to login', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
