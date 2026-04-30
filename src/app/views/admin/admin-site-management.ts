import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models';
import { MemberType } from '../../models/enums';

@Component({
  selector: 'app-admin-site-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-site-management.html',
  styleUrls: ['./admin-site-management.css']
})
export class AdminSiteManagement {
  private siteService = inject(SiteService);

  sites = this.siteService.allSites;

  newSiteName = signal('');
  newSiteLocation = signal('');
  newSiteDescription = signal('');
  newSiteOpeningHour = signal('08:00');
  newSiteClosingHour = signal('22:00');

  get canAddSite() {
    return !!this.newSiteName() && !!this.newSiteLocation();
  }

  addSite() {
    if (!this.canAddSite) {
      return;
    }

    const site: Site = {
      id: `site-${Date.now()}`,
      name: this.newSiteName(),
      location: this.newSiteLocation(),
      description: this.newSiteDescription() || 'Nouveau site de padel',
      terrains: [],
      openingHour: this.newSiteOpeningHour(),
      closingHour: this.newSiteClosingHour(),
      closedDays: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.siteService.addSite(site);
    this.resetForm();
  }

  deleteSite(siteId: string) {
    this.siteService.deleteSite(siteId);
  }

  private resetForm() {
    this.newSiteName.set('');
    this.newSiteLocation.set('');
    this.newSiteDescription.set('');
    this.newSiteOpeningHour.set('08:00');
    this.newSiteClosingHour.set('22:00');
  }
}
