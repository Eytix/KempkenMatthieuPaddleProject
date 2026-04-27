import { Injectable, signal, computed } from '@angular/core';
import { Match, Member } from '../models';
import { MatchStatus, PaymentStatus } from '../models/enums';

/**
 * MatchService - Gestion des matches/réservations
 */
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matches = signal<Match[]>([]);

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
