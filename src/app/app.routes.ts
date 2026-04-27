import { Routes } from '@angular/router';
import {Home} from './views/home/home';
import {GroundList} from './views/ground/ground-list/ground-list';
import { UserDashboard } from './views/user/user-dashboard';
import { AdminDashboard } from './views/admin/admin-dashboard';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: Home},
  {path: 'groundlist', component: GroundList},
  {
    path: 'user',
    component: UserDashboard,
    children: [
      // User routes will be added here in next steps
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
