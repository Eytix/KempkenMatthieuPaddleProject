import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { PaymentStatus } from '../../models/enums';

@Component({
  selector: 'app-admin-payment-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-payment-management.html',
  styleUrls: ['./admin-payment-management.css']
})
export class AdminPaymentManagement {
  private paymentService = inject(PaymentService);

  payments = this.paymentService.allPayments;
  paymentStatus = PaymentStatus;

  markPaid(paymentId: string) {
    this.paymentService.updatePaymentStatus(paymentId, PaymentStatus.PAID);
  }

  markFailed(paymentId: string) {
    this.paymentService.updatePaymentStatus(paymentId, PaymentStatus.FAILED);
  }

  applyPenalty(paymentId: string) {
    this.paymentService.applyPenalty(paymentId);
  }

  isOverdue(payment: { dueDate: Date; status: PaymentStatus }) {
    return payment.status === PaymentStatus.PENDING && new Date(payment.dueDate) < new Date();
  }
}
