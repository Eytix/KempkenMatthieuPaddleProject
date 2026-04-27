import {computed, inject, Injectable, signal} from '@angular/core';

export interface Ground {
  id: number;
  name: string;
  location: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class Groundservice {
  private grounds = signal<Ground[]>([
    { id: 1, name: 'Terrain Paddle Premium', location: 'Paris 15e', price: 45 },
    { id: 2, name: 'Paddle Club Central', location: 'Paris 8e', price: 50 },
    { id: 3, name: 'Court Paddle Zen', location: 'Boulogne', price: 35 },
    { id: 4, name: 'Paddle Express', location: 'La Défense', price: 55 }
  ]);

  allGrounds = this.grounds.asReadonly();

  groundCount = computed(() => {
    return this.grounds().length;
  });
}
