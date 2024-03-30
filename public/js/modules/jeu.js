import {
  majhud,
  modifieretat,
  calculedistance,
  bordurecine,
  conversation,
  lancementconversation,
  notifgeneral,
  inventaire,
  affichagedegat,
} from "./fonctions.js";

export class Jeu {
  constructor() {
    this.calculedistance = calculedistance;
    this.majhud = majhud;
    this.bordurecine = bordurecine;
    this.conversation = conversation;
    this.lancementconversation = lancementconversation;
    this.notifgeneral = notifgeneral;
    this.inventaire = inventaire;
    this.volume = 1;
    this.affichagedegat = affichagedegat;
    this.degatexte = null;
   

  }
}
