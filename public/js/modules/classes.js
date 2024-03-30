//TODO ----------------------------------------------
//TODO ------- CLASSES-----
//TODO ----------------------------------------------
import { majhud } from "./fonctions.js";
import { Jeu } from "./jeu.js";
//TODO                                CLASS JOUEUR

export const manette = {
  active: false,
  button1: false,
  button2: false,
  button3: false,
  button4: false,
  button5: false,
  button6: false,
  button7: false,
  button8: false,
  button9: false,
  button10: false,
  button11: false,
  button12: false,
  button13: false,
  button14: false,
  button15: false,
  button16: false,
  button17: false,
};

export class Joueur {
  constructor(nom) {
    this.pv = 50;
    this.pvmax = 50;
    this.nom = nom;
    this.argent = 0;
    this.chimie = 0;
    this.metal = 0;
    this.classe = "vide";
    this.spe = "vide";
    this.personnage = "vide";
    this.vit = 1;
    this.visible = true;
    this.etat = "";
    this.def = 3;
    this.atk = 5;
    this.inventaire = [];
    this.skills = [];
    this.niveau = 1;
    this.xp = 0;
    this.ulti = false;
    this.jaugeulti = 0;
    this.ultimax = 20;
    this.sprite;
  }

  reductionpv(nb) {
    this.pv -= nb;
    if (this.pv <= 0) {
      this.pv = 0;
      console.log("joueur ko");
      majhud(this);
    } else {
      majhud(this);
    }
  }
  augmentationpv(nb) {
    this.pv += nb;
    majhud(this);
  }
  ajoutobjet(objet) {
    this.inventaire.push(objet);
  }
  augmentationargent(montant) {
    effetjeu.ecu.play();
    this.argent += montant;
    majhud(this);
  }
  reductionargent(montant) {
    effetjeu.ecu.play();
    this.argent -= montant;
    majhud(this);
  }
  gainxp(montant) {
    this.xp += montant;
    if (this.niveau === 1 && this.xp >= 100) {
      this.niveau + 1;
      majhud(this);
    } else if (this.niveau === 2 && this.xp >= 200) {
      this.niveau + 1;
      majhud(this);
    } else if (this.niveau === 3 && this.xp >= 300) {
      this.niveau + 1;
    }
  }
  jaugeultiplus(montant) {
    if (this.ulti === true) {
    } else if (this.ulti === false && this.jaugeulti < this.ultimax) {
      this.jaugeulti += montant;
      majhud(this);
      if (this.jaugeulti >= this.ultimax && this.ulti === false) {
        this.ulti = true;
        effetjeu.ulti.play();
      }
    }
  }
  ultifini() {
    this.ulti = false;
    this.jaugeulti = 0;
    majhud(this);
  }
  avancerhaut() {
    this.sprite.setVelocity(0, -150);
  }
  avancerbas() {
    this.sprite.setVelocity(0, 150);
  }
  avancergauche() {
    this.sprite.setVelocity(-150, 0);
  }
  avancerdroite() {
    this.sprite.setVelocity(0, 150);
  }
  avancerstop() {
    this.sprite.setVelocity(0, 0);
  }
}

//TODO                                CLASS OBJET
export class Objet {
  constructor(nom, prix, img, type, description, effet, createur, qualite, metal, bio) {
    this.nom = nom;
    this.prix = prix;
    this.effet = effet;
    this.img = img;
    this.type = type;
    this.description = description;
    this.createur = createur;
    this.qualite = qualite;
    this.metal = metal;
    this.bio = bio;
  }
}
//TODO                                CLASS SKILLS
export class Skills {
  constructor(nom, prix, img, type, description, effet, createur, qualite, metal, bio) {
    this.nom = nom;
    this.prix = prix;
    this.effet = effet;
    this.img = img;
    this.type = type;
    this.description = description;
    this.createur = createur;
    this.qualite = qualite;
    this.metal = metal;
    this.bio = bio;
  }
}
//TODO                                CLASS ETAT

export class Etats {
  constructor() {}
  stun(joueur) {
    joueur.vitesse = 0;
  }
  ralenti(joueur) {}
  empoisoner(joueur) {}
  invisible(joueur) {}
  grandir(joueur) {
    joueur.setScale(2, 2);
  }
  enleveretat(joueur) {
    joueur.etat = "";
  }
}
//TODO                                EVENT CUSTOM
export const event = new Event("customevent");

//TODO                                VAR STYLE CSS DE TEXTE DE JEU

// *                                NOM ENNEMI
export let styletextevilain = {
  font: "10px pixel2",
  fill: "white",
  fontWeight: "bold",
  stroke: "black",
  strokeThickness: 3,
};
export const styletextedegatvilain = {
  font: "10px pixel2",
  fill: "red",
  fontWeight: "bold",
  stroke: "black",
  strokeThickness: 3,
};

//TODO                                AUDIO

//* UI

export let effetui = { click: new Audio("sons/effet/click.ogg") };

//* EFFET JEU

export let effetjeu = {
  ecu: new Audio("sons/effet/ecu.ogg"),
  meche: new Audio("sons/effet/meche.ogg"),
  meche2: new Audio("sons/effet/meche2.ogg"),
  vapeurbombe: new Audio("sons/effet/vapeurbombe.ogg"),
  vapeurbombe2: new Audio("sons/effet/vapeurbombe2.ogg"),
  ulti: new Audio("sons/effet/ulti.ogg"),
};

//* VOIX

export let voix = {
  degathomme1: new Audio("sons/voix/degathomme1.ogg"),
};

//* AMBIANCE

export let ambiance = {
  villemeca: new Audio("sons/ambiance/villemeca.ogg"),
};

//* MUSIQUE

export let musique = {};

//* Dialogue

export let dialogues = {
  vieux: {
    0: [
      "Vieil homme : Bonjour. J'essai de méditer et reposer mon esprit..",
      "Vieil homme : Parfois il faut savoir prendre du recul sur notre vie.",
      "Vieil homme : Je suis d'une époque ou l'or n'avait pas encore été découvert, j'ai vu cette ville se constuire puis se dégradé par la suite..",
      "Vieil homme : Le cuivre étant devenu obsolète et avec la création de la ville d'or je me rend bien compte que le président nous a carrément mis de côté..",
      "Vieil homme : Aujourd'hui cette ville n'a plus la même aura, et j'en suis bien triste...",
      "Vieil homme : Je vous souhaite une agréable journée, prenez garde tout de même aux voyous qui polluent le secteur..",
    ],
  },
  femme1: {
    0: [
      "Femme : Hello, j'ai pas vraiment la tête à papoter..",
      "Femme : Je me fais du soucis pour mon mari, je crois qu'il fait sa crise de la trentaine...",
      "Femme : Vous savez je vais être franche, je le soupçonne d'avoir rejoins le gang des Punks.",
      "Femme : Vous imaginez ? La ville est infestée de voyous, et mon mari il se dit, 'oh bah tiens pourquoi pas en rajouter une couche !'",
      "Femme : Vous êtes un Arcaniste ça se voit, c'est plutôt difficile de passer à côté de votre pierre magique..",
      "Femme : Si vous pouviez lui filer une bonne raclée, qu'il cesse ces agissements immatures, vous me rendriez un grand service !",
      "Femme : N'y allez pas trop fort non plus, je tiens à lui malgré tout.. ",
    ],
  },
};

export let enconversation = { value: false };
export let phraseencours = { value: false };

//                                                         TODO PLAYER

export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, keybord) {
    super(scene, x, y, texture, "Frame"); // The frame is optional
    scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setDepth(2);
    this.touche = this.scene.input.keyboard.addKeys(
      "Z,S,Q,D,A,B,C,E,F,G,H,I,J,K,L,M,N,O,P,R,T,U,V,W,X,Y,ESC,SPACE,NUMPAD_ZERO, NUMPAD_ONE,NUMPAD_TWO, NUMPAD_THREE, NUMPAD_FOUR, NUMPAD_FIVE, NUMPAD_SIX, NUMPAD_SEVEN, NUMPAD_EIGHT, NUMPAD_NINE, NUMPAD_ADD, NUMPAD_SUBTRACT,ENTER"
    );
  }

  mouvement(personnage) {
    this.touche.Z.on("down", function (event) {
      personnage.body.setVelocity(0, -150);
      personnage.play("haut");
    });
  }
}
