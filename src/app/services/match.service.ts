import { Injectable, signal, computed, inject } from '@angular/core';
import { Match, Member } from '../models';
import { MatchStatus, PaymentStatus, MemberType, MatchType } from '../models/enums';
import { PaymentService } from './payment.service';
import { MemberService } from './member.service';
import { TerrainService } from './terrain.service';

/**
 * MatchService - Gestion des matches/réservations
 */
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private paymentService = inject(PaymentService);
  private memberService = inject(MemberService);
  private terrainService = inject(TerrainService);
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
    if (this.hasBookingConflict(match)) {
      return null;
    }
    this.matches.update(matches => [...matches, match]);
    this.createPaymentsForMatch(match);
    this.memberService.updateBalance(match.organizer.id, -match.cost);
    return match.id;
  }

  hasBookingConflict(match: Match): boolean {
    const dateStr = new Date(match.date).toISOString().split('T')[0];
    return this.matches().some(m => {
      const existingDateStr = new Date(m.date).toISOString().split('T')[0];
      if (m.terrainId !== match.terrainId || existingDateStr !== dateStr) {
        return false;
      }
      const existingStart = this.timeToMinutes(m.startTime);
      const existingEnd = this.timeToMinutes(m.endTime);
      const newStart = this.timeToMinutes(match.startTime);
      const newEnd = this.timeToMinutes(match.endTime);
      return !(newEnd <= existingStart || newStart >= existingEnd);
    });
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private createPaymentsForMatch(match: Match) {
    const dueDate = new Date(match.date);
    dueDate.setDate(dueDate.getDate() - 1);

    match.players.forEach(player => {
      const paymentId = `payment-${match.id}-${player.memberId}-${Date.now()}`;
      this.paymentService.createPayment({
        id: paymentId,
        matchId: match.id,
        memberId: player.memberId,
        amount: match.costPerPlayer,
        status: PaymentStatus.PENDING,
        dueDate,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
  }

  updateMatch(matchId: string, updates: Partial<Match>) {
    this.matches.update(matches =>
      matches.map(m => m.id === matchId ? { ...m, ...updates, updatedAt: new Date() } : m)
    );
  }

  addPlayerToMatch(matchId: string, member: Member) {
    this.matches.update(matches =>
      matches.map(m => {
        if (m.id === matchId && m.players.length < 4 && !m.players.some(p => p.memberId === member.id)) {
          const updatedMatch = {
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
          this.createPaymentForPlayer(updatedMatch, member);
          return updatedMatch;
        }
        return m;
      })
    );
  }

  private createPaymentForPlayer(match: Match, member: Member) {
    const dueDate = new Date(match.date);
    dueDate.setDate(dueDate.getDate() - 1);
    const paymentId = `payment-${match.id}-${member.id}-${Date.now()}`;

    this.paymentService.createPayment({
      id: paymentId,
      matchId: match.id,
      memberId: member.id,
      amount: match.costPerPlayer,
      status: PaymentStatus.PENDING,
      dueDate,
      createdAt: new Date(),
      updatedAt: new Date()
    });
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
