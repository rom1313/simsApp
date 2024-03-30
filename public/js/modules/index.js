//TODO ----------------------------------------------
//TODO                     MAIN SCRIPT
//TODO ----------------------------------------------

//TODO                                                      IMPORTS FONCTIONS

import { modifierargent, atkpnj, majhud, notifgeneral } from "./fonctions.js";

//TODO                                                      IMPORTS VAR

import { Joueur, Objet, event, manette, effetjeu, effetui } from "./classes.js";

//TODO                                                      IMPORTS SCENES
import { Titre } from "./scenes/Titre.js";
import { Niveau1 } from "./scenes/niveau1.js";

//TODO                                                      GENIUS

const genius = $; // genius
import { Jeu } from "./jeu.js";
//TODO                                                      SOCKET

/* const socket = io("https://geniusjs.herokuapp.com"); // socket */

//TODO ----------------------------------------------
//TODO                     DEBUT DU SCRIPT
//TODO ----------------------------------------------

//TODO                                                     CREATION DU JOUEUR
export const jeu = new Jeu();
export let joueur = new Joueur("Invité");
const potion = new Objet(
  "Potion curative",
  10,
  "img/potion3",
  "consommable",
  "Un cocktail curatif",
  "Restaure 10 Pv",
  "Chimie and Co. (Cité du cuivre)",
  "Basique",
  0,
  10
);
joueur.ajoutobjet(potion);
//TODO                                ONLOAD
onload = () => {
  // mise a jour HUD
  majhud(joueur);
  // internet tcheck

  //socket event
  let datajoueur = joueur;
  /*   socket.emit("connexionjeu", datajoueur); */
};
//TODO                                                      CONFIG PHASER

var config = {
  type: Phaser.AUTO,
  width: 1366,
  height: 768,
  pixelArt: true,
  resolution: window.devicePixelRatio,
  physics: {
    default: "arcade",
    arcade: { debug: false, gravity: { y: 0 } },
  },
  input: {
    gamepad: true,
  },
  scene: [Titre, Niveau1],
};

export var game = new Phaser.Game(config);

//TODO                                                      EVENTS GLOBAL

//TODO                                GAMEPAD

window.addEventListener("gamepadconnected", (e) => {
  let pad = navigator.getGamepads()[e.gamepad.index];
  notifgeneral("manette detecté");
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length
  );
  manette.active = true;
});

window.addEventListener("gamepaddisconnected", (e) => {
  manette.active = false;
  notifgeneral("Manette déconnectée");
});

//TODO                                EVENT CONNECTE A INTERNET
ononline = () => {
  document.querySelector("#notifinternet").src = "img/interneton.png";
  console.log("en ligne !");
};
//TODO                                EVENT DECONNECTE A INTERNET

onoffline = () => {
  document.querySelector("#notifinternet").src = "img/internetoff.png";
  console.log("hors ligne  !");
};
//TODO                                EVENT ONCLICK
onclick = () => {
  console.log("clik !");
  document.querySelector("html").dispatchEvent(event);
};
document.body.addEventListener("touche1", (e) => {
  console.log(e);

  console.log("event touche 1");
});

//TODO                                EVENT CLICK logo OUVRIR INVENTAIRE

genius.event("#logoinventaire", "click", () => {
  effetui.click.play();

  document.querySelector("#inventaire").classList.toggle("invisible");
});

//TODO                                EVENT CLICK FERMER INVENTAIRE

genius.event("#fermerinventaire", "click", () => {
  effetui.click.play();
  document.querySelector("#inventaire").classList.toggle("invisible");
});

//TODO                                EVENT souris hover notif
genius.event("#notifinternet", "mouseover", (e) => {
  console.log(e.clientX);
  let p = genius.element("p", "#infobulle");
  p.style.left = "94%";
  p.style.top = "2.2%";
  console.log(e.target.src);
  if (e.target.src === "http://localhost:12000/img/interneton.png") {
    genius.textContent("Online", "#infobulle");
  } else {
    genius.textContent("Offline", "#infobulle");
  }
});

genius.event("#notifinternet", "mouseout", (e) => {
  document.querySelector("#infobulle").remove();
});

//TODO                                EVENT context menu (RIGHT CLICK)
oncontextmenu = () => {
  return false;
};

genius.event("body", "keydown", (e) => {
  if (e.code === "F3" || e.code === "F7" /* || e.code === "F12" */) {
    e.preventDefault();
  }
  if (e.code === "F1" || e.code === "F2" || e.code === "F4" || e.code === "F6") {
    e.preventDefault();
  }
});
//TODO                               SAVOIR SI LE CLIENT EST EN LIGNE

/* console.log(navigator.onLine); */
