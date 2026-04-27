export enum MemberType {
  GLOBAL = 'G',      // Gxxxx - 3 semaines avant
  SITE = 'S',        // Sxxxxx - 2 semaines avant
  FREE = 'L'         // Lxxxxx - 5 jours avant
}

export enum MatchType {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export enum MatchStatus {
  PENDING = 'PENDING',           // En attente (privé incomplet ou paiement incomplet)
  CONFIRMED = 'CONFIRMED',       // Confirmé (tous les paiements reçus)
  COMPLETED = 'COMPLETED',       // Terminé
  CANCELLED = 'CANCELLED'        // Annulé
}

export enum AdminType {
  GLOBAL = 'GLOBAL',   // Admin global - tous les sites
  SITE = 'SITE'        // Admin site - un site seulement
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED'
}
