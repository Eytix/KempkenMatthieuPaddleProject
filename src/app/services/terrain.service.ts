import { Injectable, inject } from '@angular/core';
import { TerrainControllerService } from '../api/api/terrainController.service';
import { TerrainDto } from '../api/model/terrain';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private api = inject(TerrainControllerService);

  getAll() {
    return this.api.getAll();
  }

  getById(id: string) {
    return this.api.getById(id);
  }

  getBySite(siteId: string) {
    return this.api.getBySite(siteId);
  }

  create(terrain: TerrainDto) {
    return this.api.create(terrain);
  }

  update(id: string, terrain: TerrainDto) {
    return this.api.update(id, terrain);
  }

  delete(id: string) {
    return this.api._delete(id);
  }
}
