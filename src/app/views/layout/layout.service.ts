import {inject, Injectable, effect, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private readonly breakPointObserver = inject(BreakpointObserver);
  readonly isDesktop = toSignal(
    this.breakPointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(map(result => result.matches)), { initialValue: false }
  );

  sideNavOpen = signal(false);

  constructor() {
    effect(() => {
      if (this.isDesktop()) {
        this.sideNavOpen.set(true);
      } else {
        this.sideNavOpen.set(false);
      }
    });
  }

  toggleMenu() {
    this.sideNavOpen.update(value => !value);
  }
}
