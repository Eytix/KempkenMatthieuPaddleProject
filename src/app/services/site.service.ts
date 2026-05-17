import { Injectable, signal, computed, inject } from '@angular/core';
import { SiteControllerService } from '../api/api/siteController.service';
import { SiteDto } from '../api/model/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private api = inject(SiteControllerService);

  private sites = signal<SiteDto[]>([]);

  allSites = computed(() => this.sites());

  loadSites() {
    this.api.getAll1().subscribe({
      next: data => this.sites.set(data)
    });
  }

  getSiteById(id: string) {
    return computed(() =>
      this.sites().find(site => site.id === id)
    );
  }

  addSite(site: SiteDto) {
    this.api.create1(site).subscribe({
      next: created =>
        this.sites.update(sites => [...sites, created])
    });
  }

  updateSite(id: string, site: SiteDto) {
    this.api.update1(id, site).subscribe({
      next: updated =>
        this.sites.update(sites =>
          sites.map(s => s.id === id ? updated : s)
        )
    });
  }

  deleteSite(id: string) {
    this.api.delete1(id).subscribe({
      next: () =>
        this.sites.update(sites =>
          sites.filter(site => site.id !== id)
        )
    });
  }
}
