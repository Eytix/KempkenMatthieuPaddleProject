import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MemberService } from '../../services/member.service';
import { AdminService } from '../../services/admin.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard {
  private authService = inject(AuthService);
  private memberService = inject(MemberService);
  private adminService = inject(AdminService);
  private paymentService = inject(PaymentService);

  currentUser = this.authService.currentUser;
  currentMember = computed(() => {
    const user = this.currentUser();
    return user && 'balance' in user ? user : null;
  });
  users = this.memberService.allMembers;
  admins = this.adminService.allAdmins;
  isAuthenticated = this.authService.isAuthenticated;
  pendingPayments = computed(() => {
    const user = this.currentUser();
    return user && 'balance' in user ? this.paymentService.getPendingPaymentsByMember(user.id)().length : 0;
  });

  login(user: any) {
    this.authService.login(user);
  }

  logout() {
    this.authService.logout();
  }
}
