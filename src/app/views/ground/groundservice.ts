import {computed, inject, Injectable, Signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Groundservice {

  private stringwait() {
    return 0
  }

  groundCount = computed(() => {
    return this.stringwait();
  });
}
