import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatListModule,
    RouterLink,
    MatIconModule,
    NgIf
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {
  private authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
}
