import { Injectable, inject } from '@angular/core';
import { MemberControllerService } from '../api/api/memberController.service';
import { MemberDto } from '../api/model/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private api = inject(MemberControllerService);

  getAll() {
    return this.api.getAll();
  }

  getById(id: string) {
    return this.api.getById(id);
  }

  create(member: MemberDto) {
    return this.api.create(member);
  }

  update(id: string, member: MemberDto) {
    return this.api.update(id, member);
  }

  delete(id: string) {
    return this.api._delete(id);
  }
}
