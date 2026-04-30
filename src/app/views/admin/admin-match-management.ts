import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../services/match.service';
import { MatchStatus } from '../../models/enums';

@Component({
  selector: 'app-admin-match-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-match-management.html',
  styleUrls: ['./admin-match-management.css']
})
export class AdminMatchManagement {
  private matchService = inject(MatchService);

  matches = this.matchService.allMatches;
  matchStatus = MatchStatus;

  changeStatus(matchId: string, status: MatchStatus) {
    this.matchService.updateMatch(matchId, { status });
  }

  deleteMatch(matchId: string) {
    this.matchService.deleteMatch(matchId);
  }
}
