import { Component,inject } from '@angular/core';
import {Groundservice} from '../ground/groundservice';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  groundService = inject(Groundservice);

  groundCount = this.groundService.groundCount;
}
