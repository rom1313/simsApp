//TODO ----------------------------------------------
//TODO ------- IMPORTS ET DECLARATION -----
//TODO ----------------------------------------------
import { personnage } from "./scenes/niveau1.js";
import { scene, camera } from "./scenes/niveau1.js";
import { degattexte, vieux } from "./scenes/niveau1.js";
import { dialogues, phraseencours, enconversation,styletextedegatvilain,styletextevilain } from "./classes.js";
import { Jeu } from "./jeu.js";
import { jeu } from "./index.js";
const genius = $;

/* export function argent() {
    let image = document.querySelector("#image")
    image.src = "img/Map%20test2.png"
    console.log(image.src);
    console.log(joueur);
} */
//TODO ----------------------------------------------
//TODO ------- MAJ HUD -----
//TODO ----------------------------------------------
export function majhud(joueur) {
  document.getElementById("montantchimie").textContent = joueur.chimie;
  document.getElementById("montantmetal").textContent = joueur.metal;
  document.getElementById("montantargent").textContent = joueur.argent;
  document.getElementById("montantpv").textContent = joueur.pv;
  document.getElementById("montantatk").textContent = joueur.atk;
  document.getElementById("montantdef").textContent = joueur.def;
  document.getElementById("montantvit").textContent = joueur.vit;
  document.getElementById("barredevie").value = joueur.pv;
  document.getElementById("barredevie").max = joueur.pvmax;
  document.getElementById("barreulti").value = joueur.jaugeulti;
  document.getElementById("barreulti").max = joueur.ultimax;
  document.getElementById("nivjoueur").max = joueur.niveau;
}
//TODO ----------------------------------------------
//TODO ------- MODIFICATION ARGENT -----
//TODO ----------------------------------------------
export function modifierargent(montant) {
  document.querySelector("#montantargent").textContent = montant;
}
//TODO ----------------------------------------------
//TODO ------- MODIFICATION ETAT -----
//TODO ----------------------------------------------
export function modifieretat(joueur) {}
//TODO ----------------------------------------------
//TODO ------- MESSAGE SYSTEME -----
//TODO ----------------------------------------------

export function affichermessagesysteme(joueur, montant) {}
//TODO ----------------------------------------------
//TODO ------- DIALOGUE -----
//TODO ----------------------------------------------
export function affichermessagedialogue(joueur, montant) {
  joueur.argent += montant;
  console.log(joueur);
  document.querySelector("#argentjoueur").textContent = joueur.argent;
}

export function fonctionmajtexteinfocombat(variabledutexte) {
  genius.timeursecondes(2, () => {
    variabledutexte.text = "";
  });
}

export function fonctioninfocombat(variabledutexte, contenu) {
  variabledutexte.text = contenu;
}
//TODO ----------------------------------------------
//TODO ------- Degats -----
//TODO ----------------------------------------------
export function degats(atk, def) {
  let degat = atk - def;
  fonctioninfocombat(degattexte, degat);
  fonctionmajtexteinfocombat(degattexte);
  console.log(scene);
}
//TODO ----------------------------------------------
//TODO ------- Attaque pnj projectile-----
//TODO ----------------------------------------------
export function atkpnj(scene, pnj, varaction, varprojectile, personnage) {
  console.log("orbe lancé");
}
//TODO ----------------------------------------------
//TODO ------- Calcule distance RANGE -----
//TODO ----------------------------------------------
export function calculedistance(personnage, element) {
  var dx = personnage.x - element.x;
  var dy = personnage.y - element.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  return distance.toFixed();
  /*  console.log("distance--->" + distance.toFixed()); */
}

//TODO ----------------------------------------------
//TODO ------- AFIICHAGE CINEs -----
//TODO ----------------------------------------------
export function bordurecine(camera) {
  if (document.querySelector("#cadrecine").classList.contains("disparitionsmooth")) {
    document.querySelector("#cadrecine").classList.toggle("disparitionsmooth");
    document.querySelector("#cadrecine").classList.toggle("apparitionsmooth");
    /*     camera.setZoom(2, 2, 5000, "ease"); */
    camera.zoomTo(3, 500);
  } else if (document.querySelector("#cadrecine").classList.contains("apparitionsmooth")) {
    document.querySelector("#cadrecine").classList.toggle("disparitionsmooth");
    document.querySelector("#cadrecine").classList.toggle("apparitionsmooth");
    camera.setZoom(1, 1);
  }

  /*    let timeur = genius.timeursecondes("2", () => {
      document.querySelector("#cadrecine").classList.add("invisible");
    }); */
}
//TODO ----------------------------------------------
//TODO ------- AFICHAGE boite dialogue -----
//TODO ----------------------------------------------
export function textevisibledialogue() {
  if (document.querySelector("#textdialogue").classList.contains("disparitionsmooth")) {
    console.log("dialogue invisible !");
    document.querySelector("#textdialogue").classList.toggle("disparitionsmooth");
    document.querySelector("#textdialogue").classList.toggle("apparitionsmooth");
    /*     camera.setZoom(2, 2, 5000, "ease"); */
  } else if (document.querySelector("#textdialogue").classList.contains("apparitionsmooth")) {
    document.querySelector("#textdialogue").classList.toggle("disparitionsmooth");
    document.querySelector("#textdialogue").classList.toggle("apparitionsmooth");
  }
}

//TODO ----------------------------------------------
//TODO ------- conversation -----
//TODO ----------------------------------------------
export let ilettre = { count: 0 };
export let iphrase = { count: 0 };
let dialoguefin = false;
export function conversation(dialogue) {
  if (dialoguefin === true) {
    dialoguefin = false;
    enconversation.value = false;

    ilettre.count = 0;
    iphrase.count = 0;
    console.log("fermeture conversation");
    bordurecine(camera);
    document.getElementById("textdialogue").style.visibility = "hidden";
  } else {
    enconversation.value = true;
    ecrituredialogue(dialogue);
  }
  if (enconversation === false) {
  }
}

function ecrituredialogue(dialogue) {
  // ! ecrit la phrase
  if (ilettre.count < dialogue[iphrase.count].length) {
    console.log("phrase encours => " + phraseencours.value + "en convertation => " + enconversation.value);
    enconversation.value = true;
    phraseencours.value = true;
    document.getElementById("textdialogue").innerHTML += dialogue[iphrase.count].charAt(ilettre.count);

    ilettre.count++;
    genius.timeursecondes(0.01, () => {
      ecrituredialogue(dialogue);
    });
    //! la phrase est terminé
  } else if (iphrase.count < dialogue.length - 1) {
    console.log("phrase terminé");
    phraseencours.value = false;
    ilettre.count = 0;
    iphrase.count++;

    //! fin de la dernière phrase
  } else if (iphrase.count >= dialogue.length - 1 && enconversation.value === true) {
    console.log("toute les phrase temriné mais toujours en conversation");

    dialoguefin = true;
    phraseencours.value = false;
  }
}

export function lancementconversation() {
  if (calculedistance(personnage, vieux) < 80) {
    if (enconversation.value === false) {
      document.getElementById("textdialogue").innerHTML = "";
      bordurecine(camera);
      document.getElementById("textdialogue").style.visibility = "visible";
    }
    if (phraseencours.value === true) {
    } else if (phraseencours.value === false) {
      document.getElementById("textdialogue").innerHTML = "";

      conversation(dialogues.vieux[0]);
    }
  } else if (calculedistance(personnage, scene.femmecity1) < 80) {
    if (enconversation.value === false) {
      document.getElementById("textdialogue").innerHTML = "";
      bordurecine(camera);
      document.getElementById("textdialogue").style.visibility = "visible";
    }
    if (phraseencours.value === true) {
    } else if (phraseencours.value === false) {
      document.getElementById("textdialogue").innerHTML = "";

      conversation(dialogues.femme1[0]);
    }
  }
}

//TODO ----------------------------------------------
//TODO ------- NOTIF GENERAL -----
//TODO ----------------------------------------------

export function notifgeneral(text) {
  document.querySelector("#infogeneral").style.transition = "all 2s";
  let notif = document.querySelector("#infogeneral");
  notif.textContent = "";
  notif.textContent = text;
  notif.style.opacity = 1;
  genius.timeursecondes(2, () => {
    notif.style.opacity = 0;
  });
}

//TODO ----------------------------------------------
//TODO ------- Inventaire -----
//TODO ----------------------------------------------

export function inventaire(selecteur, inventaire) {
  document.querySelector("#infogeneral").style.transition = "all 2s";
  let notif = document.querySelector("#infogeneral");
  notif.textContent = "";
  notif.textContent = text;
  notif.style.opacity = 1;
  genius.timeursecondes(2, () => {
    notif.style.opacity = 0;
  });
}

export function affichagedegat(text, cible,scene) {

  jeu.degattexte = scene.add.text(cible.x, cible.y, text, styletextedegatvilain).setDepth(5);
  scene.time.addEvent({
    delay: 500,
    callback: () => {
     jeu.degattexte.setVisible(false);
    },
    loop: false,
  });


}
