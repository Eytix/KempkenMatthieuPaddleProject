import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Groundservice } from '../groundservice';

@Component({
  selector: 'app-ground-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './ground-list.html',
  styleUrls: ['./ground-list.css'],
})
export class GroundList {
  groundService = inject(Groundservice);
  grounds = this.groundService.allGrounds;
}
