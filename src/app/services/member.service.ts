import { Injectable, signal, computed } from '@angular/core';
import { Member } from '../models';
import { MemberType } from '../models/enums';

/**
 * MemberService - Gestion des membres
 */
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members = signal<Member[]>([
    {
      id: 'G0001',
      type: MemberType.GLOBAL,
      email: 'john@paddel.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+33612345678',
      createdAt: new Date(),
      updatedAt: new Date(),
      balance: 0
    },
    {
      id: 'S0001',
      type: MemberType.SITE,
      email: 'marie@paddel.com',
      firstName: 'Marie',
      lastName: 'Smith',
      phone: '+33687654321',
      siteId: 'site-001',
      createdAt: new Date(),
      updatedAt: new Date(),
      balance: 0
    },
    {
      id: 'L0001',
      type: MemberType.FREE,
      email: 'free@paddel.com',
      firstName: 'Free',
      lastName: 'Player',
      createdAt: new Date(),
      updatedAt: new Date(),
      balance: 0
    }
  ]);

  allMembers = computed(() => this.members());

  getMemberById(memberId: string) {
    return computed(() => this.members().find(m => m.id === memberId));
  }

  getMembersByType(type: MemberType) {
    return computed(() => this.members().filter(m => m.type === type));
  }

  getMembersBySite(siteId: string) {
    return computed(() =>
      this.members().filter(m => m.type === MemberType.SITE && m.siteId === siteId)
    );
  }

  addMember(member: Member) {
    this.members.update(members => [...members, member]);
  }

  updateMember(memberId: string, updates: Partial<Member>) {
    this.members.update(members =>
      members.map(m => m.id === memberId ? { ...m, ...updates, updatedAt: new Date() } : m)
    );
  }

  updateBalance(memberId: string, amount: number) {
    this.members.update(members =>
      members.map(m =>
        m.id === memberId
          ? { ...m, balance: m.balance + amount, updatedAt: new Date() }
          : m
      )
    );
  }

  applyPenalty(memberId: string) {
    const penaltyEndDate = new Date();
    penaltyEndDate.setDate(penaltyEndDate.getDate() + 7);

    this.members.update(members =>
      members.map(m =>
        m.id === memberId
          ? { ...m, lastReservationDateBlocked: penaltyEndDate, updatedAt: new Date() }
          : m
      )
    );
  }

  deleteMember(memberId: string) {
    this.members.update(members => members.filter(m => m.id !== memberId));
  }
}
