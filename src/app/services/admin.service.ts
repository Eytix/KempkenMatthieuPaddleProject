import { Injectable, signal, computed } from '@angular/core';
import { AdminUser } from '../models';
import { AdminType } from '../models/enums';

/**
 * AdminService - Comptes administrateurs pour les tests
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admins = signal<AdminUser[]>([
    {
      id: 'A0001',
      type: AdminType.GLOBAL,
      email: 'admin@paddle.com',
      firstName: 'Admin',
      lastName: 'Test',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  allAdmins = computed(() => this.admins());

  getAdminById(adminId: string) {
    return computed(() => this.admins().find(admin => admin.id === adminId));
  }

  addAdmin(admin: AdminUser) {
    this.admins.update(admins => [...admins, admin]);
  }
}
