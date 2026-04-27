import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbar
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {

}
