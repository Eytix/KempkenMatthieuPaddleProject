import { MemberType, AdminType, MatchType, MatchStatus, PaymentStatus } from './enums';

/**
 * Member - Utilisateur du système
 */
export interface Member {
  id: string;                    // Gxxxx, Sxxxxx, Lxxxxx
  type: MemberType;              // GLOBAL, SITE, FREE
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  siteId?: string;               // Obligatoire si type = SITE
  createdAt: Date;
  updatedAt: Date;
  balance: number;               // Solde dû (négatif) ou crédit (positif)
  lastReservationDateBlocked?: Date; // Date de blocage après pénalité
}

/**
 * Site - Lieu physique avec terrains
 */
export interface Site {
  id: string;
  name: string;
  location: string;
  description?: string;
  terrains: Terrain[];
  openingHour: string;           // HH:mm format
  closingHour: string;           // HH:mm format
  closedDays: Date[];            // Jours de fermeture
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Terrain - Court de padel
 */
export interface Terrain {
  id: string;
  siteId: string;
  name: string;                  // Terrain 1, Terrain 2, etc.
  description?: string;
  pricePerHour: number;          // Prix à l'heure (en euros)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * TimeSlot - Créneau horaire disponible (1h30 + 15mn pause)
 */
export interface TimeSlot {
  id: string;
  terrainId: string;
  date: Date;
  startTime: string;             // HH:mm format (15 mn de pause après)
  endTime: string;               // HH:mm format
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Match - Réservation d'un créneau
 */
export interface Match {
  id: string;
  organizer: Member;             // Celui qui fait la réservation
  terrainId: string;
  date: Date;
  startTime: string;             // HH:mm
  endTime: string;               // HH:mm
  type: MatchType;               // PRIVATE ou PUBLIC
  status: MatchStatus;           // PENDING, CONFIRMED, COMPLETED, CANCELLED
  players: MatchPlayer[];        // 4 joueurs max
  cost: number;                  // Coût total du match
  costPerPlayer: number;         // Coût par joueur
  closedDays: Date[];            // Jours de fermeture
  createdAt: Date;
  updatedAt: Date;
}

/**
 * MatchPlayer - Joueur dans un match
 */
export interface MatchPlayer {
  memberId: string;
  member: Member;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  paymentStatus: PaymentStatus;
}

/**
 * Payment - Paiement d'un joueur pour un match
 */
export interface Payment {
  id: string;
  matchId: string;
  memberId: string;
  amount: number;                // Montant à payer (15€)
  status: PaymentStatus;         // PENDING, PAID, FAILED
  paidAt?: Date;
  dueDate: Date;                 // La veille du match
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Reservation - Historique
 */
export interface Reservation {
  id: string;
  memberId: string;
  matchId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Admin User - Administrateur
 */
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: AdminType;               // GLOBAL ou SITE
  siteId?: string;               // Obligatoire si type = SITE
  createdAt: Date;
  updatedAt: Date;
}
