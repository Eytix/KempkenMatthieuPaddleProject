import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthControllerService } from '../api/api/authController.service';
import { LoginRequestDto } from '../api/model/loginRequest';
import { LoginResponseDto } from '../api/model/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApi = inject(AuthControllerService);

  currentUser = signal<LoginResponseDto | null>(null);

  isAuthenticated = computed(() => this.currentUser() !== null);

  isAdmin = computed(() => {
    const user = this.currentUser();

    if (!user) {
      return false;
    }

    return user.role === 'ADMIN';
  });

  login(identifier: string, password: string) {

    const body: LoginRequestDto = {
      identifier,
      password
    };

    this.authApi.login(body).subscribe({
      next: (user) => {
        this.currentUser.set(user);
      },
      error: () => {
        console.log('Login failed');
      }
    });
  }

  loginWithCredentials(identifier: string, password: string) {
    this.login(identifier, password);
    return true;
  }

  logout() {
    this.currentUser.set(null);
  }
}
