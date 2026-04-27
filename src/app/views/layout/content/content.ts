import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './content.html',
  styleUrls: ['./content.css'],
})
export class Content {

}
