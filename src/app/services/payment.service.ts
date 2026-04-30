import { Injectable, signal, computed, inject } from '@angular/core';
import { Payment } from '../models';
import { PaymentStatus } from '../models/enums';
import { MemberService } from './member.service';

/**
 * PaymentService - Gestion des paiements
 */
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private memberService = inject(MemberService);
  private payments = signal<Payment[]>([]);

  allPayments = computed(() => this.payments());

  getPaymentsByMatch(matchId: string) {
    return computed(() => this.payments().filter(p => p.matchId === matchId));
  }

  getPaymentsByMember(memberId: string) {
    return computed(() => this.payments().filter(p => p.memberId === memberId));
  }

  getPendingPaymentsByMember(memberId: string) {
    return computed(() =>
      this.payments().filter(p =>
        p.memberId === memberId && p.status === PaymentStatus.PENDING
      )
    );
  }

  getOverduePayments() {
    return computed(() =>
      this.payments().filter(
        p => p.status === PaymentStatus.PENDING && new Date(p.dueDate) < new Date()
      )
    );
  }

  createPayment(payment: Payment) {
    this.payments.update(payments => [...payments, payment]);
    this.memberService.updateBalance(payment.memberId, -payment.amount);
    return payment.id;
  }

  updatePaymentStatus(paymentId: string, status: PaymentStatus) {
    this.payments.update(payments =>
      payments.map(p => {
        if (p.id !== paymentId) {
          return p;
        }

        const previousStatus = p.status;
        const updated = {
          ...p,
          status,
          paidAt: status === PaymentStatus.PAID ? new Date() : p.paidAt,
          updatedAt: new Date()
        };

        if (previousStatus !== PaymentStatus.PAID && status === PaymentStatus.PAID) {
          this.memberService.updateBalance(p.memberId, p.amount);
        }

        if (previousStatus === PaymentStatus.PAID && status !== PaymentStatus.PAID) {
          this.memberService.updateBalance(p.memberId, -p.amount);
        }

        return updated;
      })
    );
  }

  applyPenalty(paymentId: string) {
    const payment = this.payments().find(p => p.id === paymentId);
    if (!payment) {
      return;
    }

    const penaltyAmount = 15;
    this.memberService.applyPenalty(payment.memberId);
    this.memberService.updateBalance(payment.memberId, -penaltyAmount);
  }

  deletePayment(paymentId: string) {
    this.payments.update(payments => payments.filter(p => p.id !== paymentId));
  }
}
