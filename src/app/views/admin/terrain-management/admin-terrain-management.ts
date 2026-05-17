import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerrainService } from '../../../services/terrain.service';
import { SiteService } from '../../../services/site.service';
import { Terrain } from '../../../models';

@Component({
  selector: 'app-admin-terrain-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-terrain-management.html',
  styleUrls: ['./admin-terrain-management.css']
})
export class AdminTerrainManagement {
  private terrainService = inject(TerrainService);
  private siteService = inject(SiteService);

  terrains = this.terrainService.allTerrains;
  sites = this.siteService.allSites;
  expandedTerrains = signal<Set<string>>(new Set());
  sortBy = signal<'site' | 'price'>('site');

  newTerrainName = signal('');
  newTerrainDescription = signal('');
  newTerrainPrice = signal('60');
  selectedSiteForTerrain = signal('');
  newTerrainPic= signal('');


  sortedTerrains = computed(() => {
    const allTerrains = this.terrains();
    const sorted = [...allTerrains].sort((a, b) => {
      if (this.sortBy() === 'site') {
        return a.siteId.localeCompare(b.siteId);
      }
      return a.pricePerHour - b.pricePerHour;
    });
    return sorted;
  });

  get canAddTerrain() {
    return !!this.newTerrainName() && !!this.selectedSiteForTerrain();
  }

  getSiteName(siteId: string): string {
    return this.siteService.getSiteById(siteId)()?.name || 'Site inconnu';
  }

  addTerrain() {
    if (!this.canAddTerrain) {
      return;
    }

    const terrain: Terrain = {
      id: `terrain-${Date.now()}`,
      siteId: this.selectedSiteForTerrain(),
      name: this.newTerrainName(),
      description: this.newTerrainDescription(),
      pricePerHour: 60,
      createdAt: new Date(),
      updatedAt: new Date(),
      terrainpic: this.newTerrainPic(),
    };

    this.terrainService.addTerrain(terrain);
    this.resetForm();
  }

  deleteTerrain(terrainId: string) {
    this.terrainService.deleteTerrain(terrainId);
    const expanded = this.expandedTerrains();
    if (expanded.has(terrainId)) {
      expanded.delete(terrainId);
      this.expandedTerrains.set(new Set(expanded));
    }
  }

  toggleTerrainExpanded(terrainId: string) {
    const expanded = this.expandedTerrains();
    if (expanded.has(terrainId)) {
      expanded.delete(terrainId);
    } else {
      expanded.add(terrainId);
    }
    this.expandedTerrains.set(new Set(expanded));
  }

  isTerrainExpanded(terrainId: string): boolean {
    return this.expandedTerrains().has(terrainId);
  }

  setSortBy(sortOption: 'site' | 'price') {
    this.sortBy.set(sortOption);
  }

  private resetForm() {
    this.newTerrainName.set('');
    this.newTerrainDescription.set('');
    this.newTerrainPrice.set('60');
    this.selectedSiteForTerrain.set('');
    this.newTerrainPic.set('');
  }
}
