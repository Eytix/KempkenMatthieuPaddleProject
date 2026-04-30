import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../../services/match.service';
import { AuthService } from '../../../services/auth.service';
import { PaymentService } from '../../../services/payment.service';
import { PaymentStatus } from '../../../models/enums';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-reservations.html',
  styleUrls: ['./my-reservations.css']
})
export class MyReservations {
  private authService = inject(AuthService);
  private matchService = inject(MatchService);
  private paymentService = inject(PaymentService);

  currentUser = this.authService.currentUser;
  reservations = computed(() => {
    const user = this.currentUser();
    return user ? this.matchService.getMatchesByMember(user.id)() : [];
  });

  getPaymentForMatch(matchId: string) {
    const user = this.currentUser();
    if (!user) {
      return null;
    }
    return this.paymentService.getPaymentsByMember(user.id)().find(p => p.matchId === matchId) || null;
  }

  payPayment(paymentId: string) {
    this.paymentService.updatePaymentStatus(paymentId, PaymentStatus.PAID);
  }
}
