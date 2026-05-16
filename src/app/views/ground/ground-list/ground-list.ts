import { Component, computed, inject } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TerrainService } from '../../../services/terrain.service';
import { SiteService } from '../../../services/site.service';

@Component({
  selector: 'app-ground-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './ground-list.html',
  styleUrls: ['./ground-list.css'],
})
export class GroundList {
  private terrainService = inject(TerrainService);
  private siteService = inject(SiteService);

  terrains = this.terrainService.allTerrains;
  sites = this.siteService.allSites;

  groupedTerrains = computed(() => {
    const terrains = this.terrains();
    const sites = this.sites();

    const grouped: { [siteId: string]: { siteName: string; terrains: any[] } } = {};

    sites.forEach(site => {
      grouped[site.id] = {
        siteName: site.name,
        terrains: terrains.filter(t => t.siteId === site.id)
      };
    });

    return Object.values(grouped).filter(group => group.terrains.length > 0);
  });

  totalTerrains = computed(() => this.terrains().length);
}
