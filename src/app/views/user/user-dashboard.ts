import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MemberService } from '../../services/member.service';

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

  currentUser = this.authService.currentUser;
  users = this.memberService.allMembers;
  isAuthenticated = this.authService.isAuthenticated;

  login(user: any) {
    this.authService.login(user);
  }

  logout() {
    this.authService.logout();
  }
}
