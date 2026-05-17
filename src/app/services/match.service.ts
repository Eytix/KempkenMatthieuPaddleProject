import { Injectable, inject } from '@angular/core';
import { MatchControllerService } from '../api/api/matchController.service';
import { MatchDto } from '../api/model/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private api = inject(MatchControllerService);

  getAll() {
    return this.api.getAll();
  }

  create(match: MatchDto) {
    return this.api.create(match);
  }
}
