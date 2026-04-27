import { Component,inject } from '@angular/core';
import {Groundservice} from '../ground/groundservice';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  groundService = inject(Groundservice);

  groundCount = this.groundService.groundCount;
}
