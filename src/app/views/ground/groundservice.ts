import {computed, Signal, inject} from '@angular/core';

export class Groundservice {

  private stringwait() {
    return 0
  }

  groundCount = computed(() => {
    return this.stringwait();
  });
}
