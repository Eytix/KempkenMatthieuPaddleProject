import { Injectable, signal, computed } from '@angular/core';
import { Match, Member } from '../models';
import { MatchStatus, PaymentStatus, MemberType, MatchType } from '../models/enums';

/**
 * MatchService - Gestion des matches/réservations
 */
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matches = signal<Match[]>([
    {
      id: 'match-001',
      organizer: {
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
      terrainId: 'terrain-001',
      date: new Date('2026-05-15'),
      startTime: '10:00',
      endTime: '11:30',
      type: MatchType.PUBLIC,
      status: MatchStatus.PENDING,
      players: [
        {
          memberId: 'G0001',
          member: {
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
          status: 'CONFIRMED',
          paymentStatus: PaymentStatus.PAID
        }
      ],
      cost: 60,
      costPerPlayer: 15,
      closedDays: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'match-002',
      organizer: {
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
      terrainId: 'terrain-002',
      date: new Date('2026-05-16'),
      startTime: '14:00',
      endTime: '15:30',
      type: MatchType.PRIVATE,
      status: MatchStatus.PENDING,
      players: [
        {
          memberId: 'S0001',
          member: {
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
          status: 'CONFIRMED',
          paymentStatus: PaymentStatus.PAID
        }
      ],
      cost: 60,
      costPerPlayer: 15,
      closedDays: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  allMatches = computed(() => this.matches());

  getMatchById(matchId: string) {
    return computed(() => this.matches().find(m => m.id === matchId));
  }

  getMatchesByMember(memberId: string) {
    return computed(() =>
      this.matches().filter(m =>
        m.organizer.id === memberId ||
        m.players.some(p => p.memberId === memberId)
      )
    );
  }

  getPublicMatches(siteId?: string, date?: Date) {
    return computed(() =>
      this.matches().filter(m => {
        const isPublic = m.type === 'PUBLIC';
        const notFull = m.players.length < 4;
        const matchesSite = !siteId || m.terrainId.startsWith(siteId);
        const matchesDate = !date || new Date(m.date).toDateString() === date.toDateString();
        return isPublic && notFull && matchesSite && matchesDate;
      })
    );
  }

  createMatch(match: Match) {
    this.matches.update(matches => [...matches, match]);
    return match.id;
  }

  updateMatch(matchId: string, updates: Partial<Match>) {
    this.matches.update(matches =>
      matches.map(m => m.id === matchId ? { ...m, ...updates, updatedAt: new Date() } : m)
    );
  }

  addPlayerToMatch(matchId: string, member: Member) {
    this.matches.update(matches =>
      matches.map(m => {
        if (m.id === matchId && m.players.length < 4) {
          return {
            ...m,
            players: [
              ...m.players,
              {
                memberId: member.id,
                member,
                status: 'CONFIRMED' as const,
                paymentStatus: PaymentStatus.PENDING
              }
            ] as any
          };
        }
        return m;
      })
    );
  }

  removePlayerFromMatch(matchId: string, memberId: string) {
    this.matches.update(matches =>
      matches.map(m => {
        if (m.id === matchId) {
          return {
            ...m,
            players: m.players.filter(p => p.memberId !== memberId)
          };
        }
        return m;
      })
    );
  }

  updatePlayerPaymentStatus(matchId: string, memberId: string, paymentStatus: PaymentStatus) {
    this.matches.update(matches =>
      matches.map(m => {
        if (m.id === matchId) {
          return {
            ...m,
            players: m.players.map(p =>
              p.memberId === memberId
                ? { ...p, paymentStatus }
                : p
            )
          };
        }
        return m;
      })
    );
  }

  deleteMatch(matchId: string) {
    this.matches.update(matches => matches.filter(m => m.id !== matchId));
  }
}
