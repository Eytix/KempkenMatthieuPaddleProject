import {Component} from '@angular/core';
import {MatListItem} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatListItem,
    RouterLink,
    MatIcon
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {

}
