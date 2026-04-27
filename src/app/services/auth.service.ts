import { Injectable, signal, computed } from '@angular/core';
import { Member, AdminUser } from '../models';
import { MemberType } from '../models/enums';

/**
 * AuthService - Gestion de l'authentification et du membre actuellement connecté
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<Member | AdminUser | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);
  isAdmin = computed(() => {
    const user = this.currentUser();
    return user ? 'type' in user && (user.type === 'GLOBAL' || user.type === 'SITE') : false;
  });

  login(user: Member | AdminUser) {
    this.currentUser.set(user);
  }

  logout() {
    this.currentUser.set(null);
  }
}
