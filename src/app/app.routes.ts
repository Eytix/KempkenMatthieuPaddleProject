import { Routes } from '@angular/router';
import {Home} from './views/home/home';
import {GroundList} from './views/ground/ground-list/ground-list';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: Home},
  {path: 'groundlist', component: GroundList},
];
