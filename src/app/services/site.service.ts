import { Injectable, inject } from '@angular/core';
import { SiteControllerService } from '../api/api/siteController.service';
import { SiteDto } from '../api/model/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private api = inject(SiteControllerService);

  getAll() {
    return this.api.getAll();
  }

  getById(id: string) {
    return this.api.getById(id);
  }

  create(site: SiteDto) {
    return this.api.create(site);
  }

  update(id: string, site: SiteDto) {
    return this.api.update(id, site);
  }

  delete(id: string) {
    return this.api._delete(id);
  }
}
