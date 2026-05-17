import { Injectable, signal, computed, inject } from '@angular/core';
import { PayementControllerService } from '../api/api/payementController.service';
import { PayementDto } from '../api/model/payement';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private api = inject(PayementControllerService);

  private payments = signal<PayementDto[]>([]);

  allPayments = computed(() => this.payments());

  loadPayments() {
    this.api.getAll2().subscribe({
      next: data => this.payments.set(data)
    });
  }

  getPaymentById(id: string) {
    return computed(() =>
      this.payments().find(payment => payment.id === id)
    );
  }

  getPaymentsByMember(memberId: string) {
    return computed(() =>
      this.payments().filter(payment =>
        payment.memberId === memberId
      )
    );
  }

  getPendingPaymentsByMember(memberId: string) {
    return computed(() =>
      this.payments().filter(payment =>
        payment.memberId === memberId &&
        payment.status === 'PENDING'
      )
    );
  }

  createPayment(payment: PayementDto) {
    this.api.create2(payment).subscribe({
      next: created =>
        this.payments.update(payments => [...payments, created])
    });
  }

  updatePaymentStatus(id: string, status: string) {

    const payment = this.payments().find(p => p.id === id);

    if (!payment) {
      return;
    }

    const updatedPayment = {
      ...payment,
      status
    };

    this.api.update2(id, updatedPayment).subscribe({
      next: updated =>
        this.payments.update(payments =>
          payments.map(p => p.id === id ? updated : p)
        )
    });
  }

  applyPenalty(paymentId: string) {
    console.log('Penalty applied for payment', paymentId);
  }

  deletePayment(id: string) {
    this.api.delete2(id).subscribe({
      next: () =>
        this.payments.update(payments =>
          payments.filter(payment => payment.id !== id)
        )
    });
  }
}
