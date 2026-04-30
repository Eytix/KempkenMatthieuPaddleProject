import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../../services/match.service';
import { AuthService } from '../../../services/auth.service';

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

  currentUser = this.authService.currentUser;
  reservations = computed(() => {
    const user = this.currentUser();
    return user ? this.matchService.getMatchesByMember(user.id)() : [];
  });
}
