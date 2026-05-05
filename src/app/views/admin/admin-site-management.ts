import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteService } from '../../services/site.service';
import { TerrainService } from '../../services/terrain.service';
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
  private terrainService = inject(TerrainService);

  sites = this.siteService.allSites;
  expandedSites = signal<Set<string>>(new Set());
  sortBy = signal<'name' | 'location'>('name');

  sortedSites = computed(() => {
    const allSites = this.sites();
    return [...allSites].sort((a, b) => {
      if (this.sortBy() === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.location.localeCompare(b.location);
    });
  });

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
    const expanded = this.expandedSites();
    if (expanded.has(siteId)) {
      expanded.delete(siteId);
      this.expandedSites.set(new Set(expanded));
    }
  }

  toggleSiteExpanded(siteId: string) {
    const expanded = this.expandedSites();
    if (expanded.has(siteId)) {
      expanded.delete(siteId);
    } else {
      expanded.add(siteId);
    }
    this.expandedSites.set(new Set(expanded));
  }

  getTerrainsBySite(siteId: string) {
    return this.terrainService.getTerrainsBySite(siteId)();
  }

  isSiteExpanded(siteId: string): boolean {
    return this.expandedSites().has(siteId);
  }

  setSortBy(sortOption: 'name' | 'location') {
    this.sortBy.set(sortOption);
  }

  private resetForm() {
    this.newSiteName.set('');
    this.newSiteLocation.set('');
    this.newSiteDescription.set('');
    this.newSiteOpeningHour.set('08:00');
    this.newSiteClosingHour.set('22:00');
  }
}
