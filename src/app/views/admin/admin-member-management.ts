import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { MemberType } from '../../models/enums';
import { Member } from '../../models';

@Component({
  selector: 'app-admin-member-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-member-management.html',
  styleUrls: ['./admin-member-management.css']
})
export class AdminMemberManagement {
  private memberService = inject(MemberService);

  members = this.memberService.allMembers;

  newMemberFirstName = '';
  newMemberLastName = '';
  newMemberEmail = '';
  newMemberType: MemberType = MemberType.FREE;
  newMemberSiteId = '';

  MemberType = MemberType;
  types = [MemberType.GLOBAL, MemberType.SITE, MemberType.FREE];

  get canAddMember() {
    return !!this.newMemberFirstName && !!this.newMemberLastName && !!this.newMemberEmail;
  }

  addMember() {
    if (!this.canAddMember) {
      return;
    }

    const member: Member = {
      id: `M${Date.now()}`,
      type: this.newMemberType,
      email: this.newMemberEmail,
      firstName: this.newMemberFirstName,
      lastName: this.newMemberLastName,
      phone: '',
      siteId: this.newMemberType === MemberType.SITE ? this.newMemberSiteId : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      balance: 0
    };

    this.memberService.addMember(member);
    this.resetForm();
  }

  removeMember(memberId: string) {
    this.memberService.deleteMember(memberId);
  }

  private resetForm() {
    this.newMemberFirstName = '';
    this.newMemberLastName = '';
    this.newMemberEmail = '';
    this.newMemberType = MemberType.FREE;
    this.newMemberSiteId = '';
  }
}
