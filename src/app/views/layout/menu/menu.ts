import {Component} from '@angular/core';
import {MatListItem} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  imports: [
    MatListItem,
    RouterLink,
    MatIcon
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}
