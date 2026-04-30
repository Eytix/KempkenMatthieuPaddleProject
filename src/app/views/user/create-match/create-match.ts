import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteService } from '../../../services/site.service';
import { TerrainService } from '../../../services/terrain.service';
import { MemberService } from '../../../services/member.service';
import { MatchService } from '../../../services/match.service';
import { AuthService } from '../../../services/auth.service';
import { MemberType, MatchType, MatchStatus } from '../../../models/enums';
import { Match, Member } from '../../../models';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-match.html',
  styleUrls: ['./create-match.css']
})
export class CreateMatch {
  private siteService = inject(SiteService);
  private terrainService = inject(TerrainService);
  private memberService = inject(MemberService);
  private matchService = inject(MatchService);
  private authService = inject(AuthService);

  MemberType = MemberType;
  MatchType = MatchType;
  MatchStatus = MatchStatus;

  currentUser = this.authService.currentUser;
  sites = this.siteService.allSites;
  members = this.memberService.allMembers;

  selectedSiteId = '';
  selectedTerrainId = '';
  selectedDate = '';
  selectedStartTime = '';
  matchType: MatchType = MatchType.PRIVATE;
  selectedPlayers: string[] = [];

  successMessage = '';
  errorMessage = '';

  readonly cost = 60;
  readonly maxPlayers = 3;

  get selectedSite() {
    return this.siteService.getSiteById(this.selectedSiteId)();
  }

  get selectedTerrain() {
    return this.terrainService.getTerrainById(this.selectedTerrainId)();
  }

  get playersCount() {
    return 1 + this.selectedPlayers.length;
  }

  get costPerPlayer() {
    return this.cost / this.playersCount;
  }

  get availableTerrains() {
    return this.selectedSiteId ? this.terrainService.getTerrainsBySite(this.selectedSiteId)() : [];
  }

  get isClosedDay() {
    if (!this.selectedDate || !this.selectedSite) {
      return false;
    }

    const selectedDay = this.selectedDate;
    return this.selectedSite.closedDays.some(closedDate => closedDate.toISOString().split('T')[0] === selectedDay);
  }

  get availableTimes() {
    if (!this.selectedSite || !this.selectedDate || this.isClosedDay) {
      return [];
    }
    return this.generateAvailableTimes(this.selectedSite.openingHour, this.selectedSite.closingHour);
  }

  get endTime() {
    return this.calculateEndTime(this.selectedStartTime);
  }

  get canCreate() {
    return !!this.selectedSiteId && !!this.selectedTerrainId && !!this.selectedDate && !!this.selectedStartTime && !this.isClosedDay;
  }

  get minBookingDate() {
    const user = this.currentUser();
    if (!user || !('type' in user)) {
      return this.formatDate(new Date());
    }

    const now = new Date();
    if (user.type === MemberType.GLOBAL) {
      now.setDate(now.getDate() + 21);
    } else if (user.type === MemberType.SITE) {
      now.setDate(now.getDate() + 14);
    } else {
      now.setDate(now.getDate() + 5);
    }

    return this.formatDate(now);
  }

  get memberOptions() {
    const currentId = this.currentUser()?.id;
    return this.members().filter(member => member.id !== currentId);
  }

  togglePlayerSelection(memberId: string) {
    const selected = this.selectedPlayers;
    if (selected.includes(memberId)) {
      this.selectedPlayers = selected.filter(id => id !== memberId);
    } else if (selected.length < this.maxPlayers) {
      this.selectedPlayers = [...selected, memberId];
    }
  }

  onSiteChanged(siteId: string) {
    this.selectedSiteId = siteId;
    this.selectedTerrainId = '';
    this.selectedStartTime = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  onDateChanged(date: string) {
    this.selectedDate = date;
    this.selectedStartTime = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  createMatch() {
    this.errorMessage = '';
    this.successMessage = '';

    const user = this.currentUser();
    if (!user || !('balance' in user)) {
      this.errorMessage = 'Vous devez être connecté avec un compte membre pour créer un match.';
      return;
    }

    const member = user as Member;

    if (!this.canCreate) {
      this.errorMessage = 'Veuillez compléter tous les champs.';
      return;
    }

    const site = this.siteService.getSiteById(this.selectedSiteId)();
    if (!site) {
      this.errorMessage = 'Site invalide.';
      return;
    }

    const endTime = this.calculateEndTime(this.selectedStartTime);
    if (!endTime) {
      this.errorMessage = 'Horaire invalide.';
      return;
    }

    const players = [
      {
        memberId: member.id,
        member,
        status: 'CONFIRMED' as const,
        paymentStatus: 'PENDING' as const
      },
      ...this.selectedPlayers.map(memberId => {
        const selected = this.memberService.getMemberById(memberId)();
        return selected ? {
          memberId: selected.id,
          member: selected,
          status: 'PENDING' as const,
          paymentStatus: 'PENDING' as const
        } : null;
      }).filter(Boolean) as any
    ];

    const match: Match = {
      id: `match-${Date.now()}`,
      organizer: member,
      terrainId: this.selectedTerrainId,
      date: new Date(this.selectedDate),
      startTime: this.selectedStartTime,
      endTime,
      type: this.matchType,
      status: MatchStatus.PENDING,
      players,
      cost: 60,
      costPerPlayer: 15,
      closedDays: site.closedDays,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.matchService.createMatch(match);
    this.successMessage = 'Match créé avec succès.';
    this.resetForm();
  }

  private resetForm() {
    this.selectedSiteId = '';
    this.selectedTerrainId = '';
    this.selectedDate = '';
    this.selectedStartTime = '';
    this.matchType = MatchType.PRIVATE;
    this.selectedPlayers = [];
  }

  private calculateEndTime(startTime: string): string | null {
    const [hours, minutes] = startTime.split(':').map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }
    const start = hours * 60 + minutes;
    const end = start + 90;
    const endHour = Math.floor(end / 60).toString().padStart(2, '0');
    const endMinutes = (end % 60).toString().padStart(2, '0');
    return `${endHour}:${endMinutes}`;
  }

  private generateAvailableTimes(openingHour: string, closingHour: string) {
    const parse = (value: string) => {
      const [h, m] = value.split(':').map(Number);
      return h * 60 + m;
    };

    const opening = parse(openingHour);
    const closing = parse(closingHour);
    const maxStart = closing - 90;
    const step = 105; // 90 min match + 15 min pause
    const times: string[] = [];
    for (let current = opening; current <= maxStart; current += step) {
      const hh = Math.floor(current / 60).toString().padStart(2, '0');
      const mm = (current % 60).toString().padStart(2, '0');
      times.push(`${hh}:${mm}`);
    }
    return times;
  }

  private formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }
}
