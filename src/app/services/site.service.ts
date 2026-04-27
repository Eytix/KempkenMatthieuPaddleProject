import { Injectable, signal, computed } from '@angular/core';
import { Site } from '../models';

/**
 * SiteService - Gestion des sites de padel
 */
@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private sites = signal<Site[]>([
    {
      id: 'site-001',
      name: 'Padel Arena Paris',
      location: 'Paris 15e',
      description: 'Centre de padel premium à Paris',
      terrains: [],
      openingHour: '07:00',
      closingHour: '23:00',
      closedDays: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'site-002',
      name: 'Padel Club Boulogne',
      location: 'Boulogne-Billancourt',
      description: 'Club de padel profesionnel',
      terrains: [],
      openingHour: '08:00',
      closingHour: '22:00',
      closedDays: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  allSites = computed(() => this.sites());

  getSiteById(siteId: string) {
    return computed(() => this.sites().find(s => s.id === siteId));
  }

  addSite(site: Site) {
    this.sites.update(sites => [...sites, site]);
  }

  updateSite(siteId: string, updates: Partial<Site>) {
    this.sites.update(sites =>
      sites.map(s => s.id === siteId ? { ...s, ...updates, updatedAt: new Date() } : s)
    );
  }

  deleteSite(siteId: string) {
    this.sites.update(sites => sites.filter(s => s.id !== siteId));
  }
}
