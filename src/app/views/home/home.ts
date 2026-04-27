import { Component,inject } from '@angular/core';
import {Groundservice} from '../ground/groundservice';
import {MatListItem} from '@angular/material/list';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatListItem,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  groundService = inject(Groundservice);

  groundCount = this.groundService.groundCount;
}
