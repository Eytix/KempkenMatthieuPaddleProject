import { Injectable, signal, computed } from '@angular/core';
import { Terrain } from '../models';

/**
 * TerrainService - Gestion des terrains de padel
 */
@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private terrains = signal<Terrain[]>([
    {
      id: 'terrain-001',
      siteId: 'site-001',
      name: 'Terrain 1',
      description: 'Terrain principal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'terrain-002',
      siteId: 'site-001',
      name: 'Terrain 2',
      description: 'Terrain secondaire',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'terrain-003',
      siteId: 'site-002',
      name: 'Terrain 1',
      description: 'Terrain premium',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  allTerrains = computed(() => this.terrains());

  getTerrainsBySite(siteId: string) {
    return computed(() => this.terrains().filter(t => t.siteId === siteId));
  }

  getTerrainById(terrainId: string) {
    return computed(() => this.terrains().find(t => t.id === terrainId));
  }

  addTerrain(terrain: Terrain) {
    this.terrains.update(terrains => [...terrains, terrain]);
  }

  updateTerrain(terrainId: string, updates: Partial<Terrain>) {
    this.terrains.update(terrains =>
      terrains.map(t => t.id === terrainId ? { ...t, ...updates, updatedAt: new Date() } : t)
    );
  }

  deleteTerrain(terrainId: string) {
    this.terrains.update(terrains => terrains.filter(t => t.id !== terrainId));
  }
}
