import { Injectable, signal, computed, inject } from '@angular/core';
import { MemberControllerService } from '../api/api/memberController.service';
import { MemberDto } from '../api/model/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private api = inject(MemberControllerService);

  private members = signal<MemberDto[]>([]);

  allMembers = computed(() => this.members());

  loadMembers() {
    this.api.getAll3().subscribe({
      next: data => this.members.set(data)
    });
  }

  getMemberById(id: string) {
    return computed(() =>
      this.members().find(member => member.id === id)
    );
  }

  getMembersBySite(siteId: string) {
    return computed(() =>
      this.members().filter(member =>
        member.siteId === siteId
      )
    );
  }

  addMember(member: MemberDto) {
    this.api.create3(member).subscribe({
      next: created =>
        this.members.update(members => [...members, created])
    });
  }

  updateMember(id: string, member: MemberDto) {
    this.api.update3(id, member).subscribe({
      next: updated =>
        this.members.update(members =>
          members.map(m => m.id === id ? updated : m)
        )
    });
  }

  deleteMember(id: string) {
    this.api.delete3(id).subscribe({
      next: () =>
        this.members.update(members =>
          members.filter(member => member.id !== id)
        )
    });
  }

  updateBalance(memberId: string, amount: number) {
    this.members.update(members =>
      members.map(member =>
        member.id === memberId
          ? {
            ...member,
            balance: (member.balance || 0) + amount
          }
          : member
      )
    );
  }

  applyPenalty(memberId: string) {
    console.log('Penalty applied to', memberId);
  }
}
