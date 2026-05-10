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
  PENDING = 'EN_ATTENTE',           // En attente (privé incomplet ou paiement incomplet)
  CONFIRMED = 'CONFIRME',       // Confirmé (tous les paiements reçus)
  COMPLETED = 'TERMINE',       // Terminé
  CANCELLED = 'ANNULE'        // Annulé
}

export enum AdminType {
  GLOBAL = 'GLOBAL',   // Admin global - tous les sites
  SITE = 'SITE'        // Admin site - un site seulement
}

export enum PaymentStatus {
  PENDING = 'EN_ATTENTE',
  PAID = 'PAYE',
  FAILED = 'ECHOUE'
}
