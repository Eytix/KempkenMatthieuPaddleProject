import { Routes } from '@angular/router';
import {Home} from './views/home/home';
import {GroundList} from './views/ground/ground-list/ground-list';
import { UserDashboard } from './views/user/user-dashboard';
import { AdminDashboard } from './views/admin/dashboard/admin-dashboard';
import { MyReservations } from './views/user/my-reservations/my-reservations';
import { PublicMatches } from './views/user/public-matches/public-matches';
import { CreateMatch } from './views/user/create-match/create-match';
import { AdminSiteManagement } from './views/admin/site-management/admin-site-management';
import { AdminTerrainManagement } from './views/admin/terrain-management/admin-terrain-management';
import { AdminMatchManagement } from './views/admin/match-management/admin-match-management';
import { AdminMemberManagement } from './views/admin/member-management/admin-member-management';
import { AdminPaymentManagement } from './views/admin/payment-management/admin-payment-management';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: Home},
  {path: 'groundlist', component: GroundList},
  {
    path: 'user',
    component: UserDashboard,
    children: [
      { path: '', redirectTo: 'reservations', pathMatch: 'full' },
      { path: 'reservations', component: MyReservations },
      { path: 'public-matches', component: PublicMatches },
      { path: 'create-match', component: CreateMatch }
    ]
  },
  {
    path: 'admin',
    component: AdminDashboard,
    children: [
      { path: '', redirectTo: 'sites', pathMatch: 'full' },
      { path: 'sites', component: AdminSiteManagement },
      { path: 'terrains', component: AdminTerrainManagement },
      { path: 'matches', component: AdminMatchManagement },
      { path: 'members', component: AdminMemberManagement },
      { path: 'payments', component: AdminPaymentManagement }
    ]
  }
];
