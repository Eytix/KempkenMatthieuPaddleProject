import { Injectable, inject } from '@angular/core';
import { PayementControllerService } from '../api/api/payementController.service';
import { PayementDto } from '../api/model/payement';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  private api = inject(PayementControllerService);

  getAll() {
    return this.api.getAll();
  }

  getById(id: string) {
    return this.api.getById(id);
  }

  create(payement: PayementDto) {
    return this.api.create(payement);
  }

  update(id: string, payement: PayementDto) {
    return this.api.update(id, payement);
  }

  delete(id: string) {
    return this.api._delete(id);
  }
}
