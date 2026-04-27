import {Component, inject, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {LayoutService} from '../layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconModule,
    MatIconButton
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  layoutService = inject(LayoutService);

  title = signal("Site de padle");

}
