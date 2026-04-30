import { Routes } from '@angular/router';
import {Home} from './views/home/home';
import {GroundList} from './views/ground/ground-list/ground-list';
import { UserDashboard } from './views/user/user-dashboard';
import { AdminDashboard } from './views/admin/admin-dashboard';
import { MyReservations } from './views/user/my-reservations/my-reservations';
import { PublicMatches } from './views/user/public-matches/public-matches';

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
      { path: 'public-matches', component: PublicMatches }
    ]
  },
  {
    path: 'admin',
    component: AdminDashboard,
    children: [
      // Admin routes will be added here in next steps
    ]
  }
];
