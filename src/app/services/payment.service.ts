import { Injectable, signal, computed } from '@angular/core';
import { Payment } from '../models';
import { PaymentStatus } from '../models/enums';

/**
 * PaymentService - Gestion des paiements
 */
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
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

  createPayment(payment: Payment) {
    this.payments.update(payments => [...payments, payment]);
    return payment.id;
  }

  updatePaymentStatus(paymentId: string, status: PaymentStatus) {
    this.payments.update(payments =>
      payments.map(p =>
        p.id === paymentId
          ? {
              ...p,
              status,
              paidAt: status === PaymentStatus.PAID ? new Date() : p.paidAt,
              updatedAt: new Date()
            }
          : p
      )
    );
  }

  deletePayment(paymentId: string) {
    this.payments.update(payments => payments.filter(p => p.id !== paymentId));
  }
}
