import { Injectable, signal, computed, inject } from '@angular/core';
import { MatchControllerService } from '../api/api/matchController.service';
import { MatchDto } from '../api/model/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private api = inject(MatchControllerService);

  private matches = signal<MatchDto[]>([]);

  allMatches = computed(() => this.matches());

  loadMatches() {
    this.api.getAll4().subscribe({
      next: data => this.matches.set(data)
    });
  }

  getMatchById(id: string) {
    return computed(() =>
      this.matches().find(m => m.id === id)
    );
  }

  createMatch(match: MatchDto) {
    this.api.create4(match).subscribe({
      next: created =>
        this.matches.update(matches => [...matches, created])
    });
  }

  updateMatch(id: string, updatedMatch: MatchDto) {
    this.api.update4(id, updatedMatch).subscribe({
      next: updated =>
        this.matches.update(matches =>
          matches.map(m => m.id === id ? updated : m)
        )
    });
  }

  deleteMatch(id: string) {
    this.api._delete4(id).subscribe({
      next: () =>
        this.matches.update(matches =>
          matches.filter(m => m.id !== id)
        )
    });
  }

  getMatchesByMember(memberId: string) {
    return computed(() =>
      this.matches().filter(match =>
        match.organizerId === memberId
      )
    );
  }

  getPublicMatches() {
    return computed(() =>
      this.matches().filter(match =>
        match.type === 'PUBLIC'
      )
    );
  }

  addPlayerToMatch(matchId: string, member: any) {
    console.log('TODO add player to match');
  }
}
