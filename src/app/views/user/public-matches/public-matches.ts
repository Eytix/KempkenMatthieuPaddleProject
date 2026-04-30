import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../../services/match.service';
import { AuthService } from '../../../services/auth.service';
import { PaymentStatus } from '../../../models/enums';

@Component({
  selector: 'app-public-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-matches.html',
  styleUrls: ['./public-matches.css']
})
export class PublicMatches {
  private matchService = inject(MatchService);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;
  publicMatches = this.matchService.getPublicMatches();

  joinMatch(matchId: string) {
    const user = this.currentUser();
    if (!user) {
      return;
    }
    this.matchService.addPlayerToMatch(matchId, user as any);
  }

  canJoin(matchId: string) {
    const match = this.publicMatches().find(m => m.id === matchId);
    const user = this.currentUser();
    if (!match || !user) {
      return false;
    }

    if ('lastReservationDateBlocked' in user && user.lastReservationDateBlocked && new Date(user.lastReservationDateBlocked) > new Date()) {
      return false;
    }

    return match.players.length < 4;
  }

  getPaymentStatusBadge(status: PaymentStatus) {
    if (status === PaymentStatus.PAID) return 'bg-green-100 text-green-700';
    if (status === PaymentStatus.PENDING) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  }
}
