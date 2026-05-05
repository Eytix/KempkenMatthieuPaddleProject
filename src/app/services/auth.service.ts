import { Injectable, signal, computed, inject } from '@angular/core';
import { Member, AdminUser } from '../models';
import { MemberService } from './member.service';
import { AdminService } from './admin.service';
import { MemberType } from '../models/enums';

/**
 * AuthService - Gestion de l'authentification et du membre actuellement connecté
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private memberService = inject(MemberService);
  private adminService = inject(AdminService);

  currentUser = signal<Member | AdminUser | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);
  isAdmin = computed(() => {
    const user = this.currentUser();
    return user ? 'type' in user && (user.type === 'GLOBAL' || user.type === 'SITE') : false;
  });

  login(user: Member | AdminUser) {
    this.currentUser.set(user);
  }

  loginWithCredentials(identifier: string, password: string): boolean {
    const normalizedId = identifier.trim().toUpperCase();
    const member = this.memberService.getMemberById(normalizedId)();
    if (member && member.password === password) {
      this.login(member);
      return true;
    }

    const admin = this.adminService.getAdminById(normalizedId)();
    if (admin && admin.password === password) {
      this.login(admin);
      return true;
    }

    return false;
  }

  logout() {
    this.currentUser.set(null);
  }
}
