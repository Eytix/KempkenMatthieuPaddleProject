import {Component, computed, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MemberService } from '../../services/member.service';
import { PaymentService } from '../../services/payment.service';
import { AdminControllerService } from '../../api';
import { AdminDto } from '../../api';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard {

  private authService = inject(AuthService);
  private memberService = inject(MemberService);
  private adminApi = inject(AdminControllerService);
  private paymentService = inject(PaymentService);

  currentUser = this.authService.currentUser;
  currentMember = computed(() => {
    const user = this.currentUser();
    return user && 'balance' in user ? user : null;
  });


  users = this.memberService.allMembers;
  admins = signal<AdminDto[]>([]);

  isAuthenticated = this.authService.isAuthenticated;
  pendingPayments = computed(() => {
    const user = this.currentUser();
    return user && 'balance' in user ? this.paymentService.getPendingPaymentsByMember(user.id)().length : 0;
  });

  loginIdentifier = '';
  loginPassword = '';
  showTestAccounts = false;
  loginError = '';

  loginWithCredentials() {
    this.loginError = '';
    const success = this.authService.loginWithCredentials(this.loginIdentifier, this.loginPassword);
    if (!success) {
      this.loginError = 'Matricule ou mot de passe incorrect.';
      return;
    }
    this.loginIdentifier = '';
    this.loginPassword = '';
    this.showTestAccounts = false;
  }

  login(user: any) {
    this.authService.login(user);
    this.loginError = '';
  }

  logout() {
    this.authService.logout();
  }
}
