import { Component, inject, signal } from '@angular/core';
import {Menu} from './views/layout/menu/menu';
import {Header} from './views/layout/header/header';
import {Content} from './views/layout/content/content';
import {Footer} from './views/layout/footer/footer';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatNavList} from '@angular/material/list';
import {LayoutService} from './views/layout/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Menu,
    Header,
    Content,
    Footer,
    MatSidenav,
    MatToolbar,
    MatNavList,
    MatSidenavContent,
    MatSidenavContainer,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('PaddleAngular');
  layoutService = inject(LayoutService);
}
