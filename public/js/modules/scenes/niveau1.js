//comm ________________________________________________________    VARIABLES ET IMPORTS _________________________________________
import { skills } from "../skills.js";
import { Etats, styletextevilain, styletextedegatvilain, Player, manette } from "../classes.js";
import {
  fonctionmajtexteinfocombat,
  degats,
  modifierargent,
  atkpnj,
  calculedistance,
  majhud,
  bordurecine,
  conversation,
  iphrase,
  ilettre,
  textevisibledialogue,
  lancementconversation,
  notifgeneral,
} from "../fonctions.js";
import { game, joueur } from "../index.js";
import { musique, effetjeu, effetui, voix, ambiance, dialogues, enconversation, phraseencours } from "../classes.js";
import { jeu } from "../index.js";
// VARIABLES
let touchesclavierFLECHES;
let touche;

// todo          PERSONNAGE
export let personnage;
let vitessepersonnage;
let directionpersonnage = "bas";
let personnageimmobile = true;

let pretre;
// todo          CAMERA

export let camera;
export let scene;
export let degattexte = null;
export let degattextevilain = null;
let dialoguetext;
let sourcedelumierejoueur;
const genius = $;
// variables styles text
let stylemessageinfo;
let styledialogue;
let texttest = `1`;
let lumiere1;
let parralax;
let parralax2;
let projectile;
let bouclier;
let bouclieractif = false;
let banc;
// initialisation
let directionpnj1 = "bas";
let pnj1mouvement = false;
let etat = new Etats();
let orbenoir;
let orbeactive = false;
let bombe = false;
let bombe2 = false;
// fonctions
let pnj1;
export let vieux;
let ecu;
let ecurecup = false;
let compteur = 0;

let degatencours = false;

//* _______________________________________________________________  DEBUT DE LA SCENE ________________________________________

export class Niveau1 extends Phaser.Scene {
  constructor() {
    super("Niveau1");
  } // nom de la scene

  //  ! _______________________________________________                     P R E L O A D ____________________________

  preload() {
    scene = this; // assignation de la scene a une variable nommé scene

    // TODO ________________________________________________________________   PERSONNAGE   ____________________

    this.load.spritesheet("personnage", "img/aquamanciene.png", { frameWidth: 160, frameHeight: 160 }); // import sprite personnage*

    this.load.image("chapeau", "img/composition/chapeau.png"); // import fond de scene

    // TODO  ________________________________________________________________   MAP  ____________________

    this.load.image("fond", "img/citygrande.png"); // import fond de scene

    // TODO  ________________________________________________________________   CIEL  ____________________

    this.load.image("ciel", "img/ciel.png"); // import fond de scene

    // TODO  ________________________________________________________________   nuage ____________________

    this.load.image("nuage", "img/nuage.png"); // import fond de scene
    // TODO  ________________________________________________________________   MAISON 1  ____________________

    this.load.image("maison1", "img/composition/maison/maison6.png"); // import fond de scene
    // TODO  ________________________________________________________________   MAISON cote gauche 1  ____________________

    this.load.image("maisoncotegauche1", "img/composition/maison/maisoncote1.png"); // import fond de scene

    // TODO  ________________________________________________________________   MAISON GRANDE  ____________________

    this.load.image("maisongrande", "img/composition/maison/maisongrande.png"); // import fond de scene

    // TODO  ________________________________________________________________   Pnj 1   ____________________

    this.load.spritesheet("pnj", "img/punkfemme.png", { frameWidth: 160, frameHeight: 160 }); // import sprite personnage

    // todo  ________________________________________________________________   BOMBES   ____________________

    this.load.spritesheet("bombe", "img/bombestest.png", { frameWidth: 46, frameHeight: 63 });

    // todo  ________________________________________________________________   VapeurBOMBE   ____________________

    this.load.spritesheet("vapeurbombe", "img/vapeurbombe.png", { frameWidth: 320, frameHeight: 320 }); // import sprite ublo

    // todo  ________________________________________________________________   BANC   ____________________

    this.load.spritesheet("banc", "img/banc.png", { frameWidth: 80, frameHeight: 80 }); // import sprite personnage

    // todo  ________________________________________________________________   caiise   ____________________

    this.load.spritesheet("caisse", "img/caissesprite.png", { frameWidth: 46, frameHeight: 63 }); // import sprite personnage

    // todo  ________________________________________________________________   ECU   ____________________

    this.load.spritesheet("ecu", "img/ecu.png", { frameWidth: 46, frameHeight: 63 });

    // todo  ________________________________________________________________   BOUCLIER   ____________________

    this.load.spritesheet("bouclier", "img/bouclier.png", { frameWidth: 80, frameHeight: 80 });

    this.load.spritesheet("filet", "img/spritefilet.png", { frameWidth: 46, frameHeight: 63 });
    this.load.spritesheet("orbe", "img/orbe.png", { frameWidth: 80, frameHeight: 80 });

    // todo  ________________________________________________________________   UBLO   ____________________

    this.load.spritesheet("ublo", "img/ublo.png", { frameWidth: 160, frameHeight: 160 }); // import sprite ublo

    // todo  ________________________________________________________________   LAMPADAIRE   ____________________

    this.load.spritesheet("lampadaire", "img/lampadaire.png", { frameWidth: 320, frameHeight: 320 }); // import sprite ublo

    // todo  ________________________________________________________________   Villageois   ____________________

    this.load.spritesheet("vieux", "img/vieuxassis.png", { frameWidth: 46, frameHeight: 63 });
    this.load.spritesheet("femme1", "img/femmecity.png", { frameWidth: 46, frameHeight: 66 });
  }

  // !                                                                                                                                C R E A T E

  create() {
    // * ______________________________________________________________    CAMERA    ________________________________________

    camera = this.cameras.main; // creation d'une camera
    camera.fadeIn(800, 1); // effet fade in de la scene
    camera.setZoom(1, 1, 4000, "ease");
    this.physics.world.setBounds(0, 0, 2732, 1536);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 2732, 1536);
    /*  */
    // * _______________________________________________________________________________________ TOUCHES CLAVIER

    touche = this.input.keyboard.addKeys(
      "Z,S,Q,D,A,B,C,E,F,G,H,I,J,K,L,M,N,O,P,R,T,U,V,W,X,Y,ESC,SPACE,NUMPAD_ZERO, NUMPAD_ONE,NUMPAD_TWO, NUMPAD_THREE, NUMPAD_FOUR, NUMPAD_FIVE, NUMPAD_SIX, NUMPAD_SEVEN, NUMPAD_EIGHT, NUMPAD_NINE, NUMPAD_ADD, NUMPAD_SUBTRACT,ENTER"
    ); // creation des touches
    touchesclavierFLECHES = this.input.keyboard.createCursorKeys(); // creation des touches fléchés

    // TODO --------------------------------------------------------------- Condition projectile
    // TODO                                                                    Event touche SKILL

    document.querySelector("body").addEventListener("keydown", (e) => {});

    /*   document.querySelector("body").addEventListener("orbepnj1", (e) => {
      if (orbeactive === false) {
      

    

        scene.physics.add.collider(
          personnage,
          [orbenoir], // ajout de colision entres sprites
          function colision(personnage, collisionsprite) {
            orbenoir.destroy();
            orbeactive = true;
            /* 
      
    /* camera.shake(1000, 0.025); */
    /*       etat.stun(joueur); */
    /* fonctioninfocombat(messageinfocombatjoueur, "-40")
                  fonctionmajtexteinfocombat(messageinfocombatjoueur); 
          } // fonction lors de la colision
        );
      }
    }); */
    var container = this.add.container(1366, 768).setName("conty");
    parralax = this.add.tileSprite(1366, 584, 2732, 1536, "nuage").setName("tiley");

    //TODO -------                                                               BACKGROUND
    this.background = this.add.image(1366, 768, "fond").setDepth(0); // creation fond de scene
    this.ciel = this.add.image(1366, 768, "ciel").setDepth(-1); // creation fond de scene

    //TODO -------                                                               MAISON 1
    this.maison1 = this.physics.add
      .sprite(280, 270, "maison1")
      .setSize(444, 250) // width, height
      .setInteractive(this.input.makePixelPerfect())
      .setDepth(0)
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(false)
      .setImmovable(true);
    // creation fond de scene
    //TODO -------                                                               MAISON cote gauche 1
    this.maisoncotegauche1 = this.physics.add
      .sprite(70, 950, "maisoncotegauche1")
      .setSize(335, 250)
      .setInteractive(this.input.makePixelPerfect())
      .setDepth(0)
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(false)
      .setImmovable(true);
    // creation fond de scene
    //TODO -------                                                               MAISON GRANDE
    this.maisongrande = this.physics.add
      .sprite(1365, 280, "maisongrande")
      .setSize(633, 380)
      .setInteractive(this.input.makePixelPerfect())
      .setDepth(0)
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(false)
      .setImmovable(true);
    // creation fond de scene
    //TODO -------                                                               PERSONNAGE
    /* this.player = this.physics.add.existing(new Player(this, 500, 500, "personnage", touche)); */
    personnage = this.physics.add
      .sprite(80, 200, "personnage")
      .setInteractive(this.input.makePixelPerfect()) // hitbox parfaite
      .setSize(20, 50, true) // hitbox
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(true) // colision du monde
      .setDepth(3) // z-index
      .setScale(1, 1); // scale

    this.chapeau = this.add.image(1, -31, "chapeau").setDepth(5); // creation fond de scene

    console.log(personnage);
    camera.startFollow(personnage);

    //TODO -------                                                               PNJ1
    pnj1 = this.physics.add
      .sprite(1000, 1155, "pnj")
      .setImmovable(true)
      .setInteractive(this.input.makePixelPerfect()) // hitbox parfaite
      .setSize(20, 50, true) // hitbox
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(true) // colision du monde
      .setDepth(1) // z-index
      .setScale(1, 1); // scale
    pnj1.atk = 10;
    pnj1.def = 3;
    pnj1.animatk = () => {
      pnj1.play("cacpnj1");
    };

    //TODO -------                                                            VIEUX
    vieux = this.physics.add
      .sprite(2070.5, 218, "vieux")
      .setImmovable(true)
      .setInteractive(this.input.makePixelPerfect()) // hitbox parfaite
      .setSize(20, 50, true) // hitbox
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(true) // colision du monde
      .setDepth(1) // z-index
      .setScale(1, 1); // scale
    //TODO -------                                                            Femme CITY 1
    this.femmecity1 = this.physics.add
      .sprite(580, 210, "femme1")
      .setImmovable(true)
      .setInteractive(this.input.makePixelPerfect()) // hitbox parfaite
      .setSize(20, 50, true) // hitbox
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(true) // colision du monde
      .setDepth(1) // z-index
      .setScale(1, 1); // scale

    //TODO -------                                                               BANC

    banc = this.physics.add
      .sprite(2072, 220, "banc")
      .setInteractive(this.input.makePixelPerfect()) // hitbox parfaite
      .setSize(60, 15, true) // hitbox
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(true) // colision du monde
      .setDepth(0) // z-index
      .setScale(1, 1)
      .setImmovable(true); // scale
    //TODO -------                                                                CAISSES

    this.caisse = this.physics.add
      .sprite(96, 698, "caisse")
      .setInteractive(this.input.makePixelPerfect()) // hitbox parfaite
      .setSize(18, 12, true) // hitbox
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(true) // colision du monde
      .setDepth(0) // z-index
      .setScale(1, 1)
      .setImmovable(true); // scale

    this.caisse2 = this.physics.add
      .sprite(80, 555, "caisse")
      .setInteractive(this.input.makePixelPerfect()) // hitbox parfaite
      .setSize(18, 15, true) // hitbox
      .setBounce(0, 0) // rebond sur colision
      .setCollideWorldBounds(true) // colision du monde
      .setDepth(0) // z-index
      .setScale(1, 1)
      .setImmovable(true); // scale

    //TODO -------                                                               UBLO

    this.ublo = this.physics.add.sprite(170, 380, "ublo").setImmovable(true).setDepth(2).setSize(3, 13).setInteractive(this.input.makePixelPerfect());

    //TODO -------                                                               LAMPADAIRE

    this.lampadaire = this.physics.add
      .sprite(95, 305, "lampadaire")
      .setImmovable(true)
      .setDepth(1)
      .setSize(20, 150)
      .setInteractive(this.input.makePixelPerfect());

    //TODO -------                                                               ECU

    ecu = this.ecu = this.physics.add
      .sprite(85, 590, "ecu")
      .setImmovable(true)
      .setDepth(0)
      .setSize(10, 15)
      .setInteractive(this.input.makePixelPerfect());
    /*   //TODO -------                                                               BOMBE

    this.bombe = this.physics.add
      .sprite(570, 515, "bombe")
      .setImmovable(true)
      .setDepth(0)
      .setSize(5, 30)
      .setInteractive(this.input.makePixelPerfect()); */
    //TODO -------                                                            VAPEUR BOMBE
    /* 
    this.vapeurbombe = this.physics.add
      .sprite(870, 515, "vapeurbombe")
      .setImmovable(true)
      .setDepth(4)
      .setSize(5, 30)
      .setScale(1, 1)
      .setInteractive(this.input.makePixelPerfect()); */

    //TODO -------                                                               PIERRE MAGIQUE

    projectile = this.filet = this.physics.add
      .sprite(150, 0, "filet")
      .setVelocity(0, 300)
      .setCollideWorldBounds(true)
      .setBounce(1, 1)
      .setSize(10, 10, true)
      .setScale(1, 1)
      .setDepth(5);
    //TODO -------                                                               PARTICULE SUR LA PIERRE

    var particles = this.add.particles("filet"); // creation particule
    var emitter = particles.createEmitter({ speed: 30, scale: { start: 0, end: 0.1, quantity: 10 }, blendMode: "ADD" }); // config des particules
    emitter.startFollow(projectile);

    /* camera.startFollow(personnage); */
    // creation de styles texte
    stylemessageinfo = {
      font: "50px impact",
      fill: "red",
      align: "center",
      display: "flex",
      justifyContent: "center",
      textShadow: "4px 5px 16px green",
      fontWeight: "bold",
      stroke: "#000000",
      strokeThickness: 1.5,
    }; // syle message info

    styledialogue = {
      font: "10px pixel2",
      fill: "white",
      textShadow: "0px 0px 56px red",
      fontWeight: "bold",
      stroke: "red",
      strokeThickness: 1.5,
    }; // syle message info

    // todo                                                                           LUMIERES
    /*     this.background.setPipeline("Light2D"); */
    /*    this.lights.setAmbientColor(0, 0, 0); */
    /*     personnage.setPipeline("Light2D"); */

    /*   vieux.setPipeline("light2D");
    banc.setPipeline("Light2D");

    this.lights.addLight(900, 1000, 600).setIntensity(5);
    lumiere1 = this.lights.addLight(800, -500, 6000).setIntensity(20);
    this.lights.enable(); */
    lumiere1 = this.add.pointlight(170, 380, 0, 70, 10).setDepth(4);
    lumiere1.attenuation = 0.01;
    lumiere1.color.setTo(60, 45, 215);
    let lumiere2 = this.add.pointlight(2600, 50, 0, 400, 10).setDepth(5);
    lumiere2.attenuation = 0.008;
    lumiere2.color.setTo(246, 148, 50);
    this.tweens.add({
      targets: lumiere2,
      x: 2620,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 800,
    });
    /*     scene.camera1 = this.cameras.add(200, 500, 200, 400);
    scene.camera1.startFollow(vieux)
    scene.camera1.setZoom(8,8) */
    //TODO -------                                                               COLLISION PERSONNAGE

    this.physics.add.collider(
      personnage,
      [pnj1, this.femmecity1], // ajout de colision entres sprites
      function colision(personnage, collisionsprite) {
        collisionsprite.setImmovable(true);

        /* 
        camera.setZoom(2, 2, 5, "ease"); */
        /* camera.shake(1000, 0.025); */
        /*       etat.stun(joueur); */
        /* fonctioninfocombat(messageinfocombatjoueur, "-40")
                fonctionmajtexteinfocombat(messageinfocombatjoueur); */
      } // fonction lors de la colision
    );

    //TODO -------                                                               COLLISION PERSONNAGE OBJET DECORS

    this.physics.add.collider(
      [personnage, this.caisse, this.caisse2, pnj1],

      [banc, this.lampadaire, this.caisse, this.caisse2, this.maisoncotegauche1, this.maison1, this.maisongrande], // * ajout de colision entres sprites

      function colision(personnage, collisionsprite) {
        collisionsprite.setImmovable(true);
        if (collisionsprite.texture.key === "caisse") {
          if (directionpersonnage === "gauche") {
            collisionsprite.setVelocity(-20, 0);
            genius.timeursecondes(
              0.5,
              () => {
                collisionsprite.setVelocity(0, 0);
              },
              "once"
            );
          }
          if (directionpersonnage === "droite") {
            collisionsprite.setVelocity(20, 0);
            genius.timeursecondes(
              0.5,
              () => {
                collisionsprite.setVelocity(0, 0);
              },
              "once"
            );
          }
          if (directionpersonnage === "haut") {
            collisionsprite.setVelocity(0, -20);
            genius.timeursecondes(
              0.5,
              () => {
                collisionsprite.setVelocity(0, 0);
              },
              "once"
            );
          }
          if (directionpersonnage === "bas") {
            collisionsprite.setVelocity(0, 20);
            genius.timeursecondes(
              0.5,
              () => {
                collisionsprite.setVelocity(0, 0);
              },
              "once"
            );
          }
        } else {
        }

        /*       etat.stun(joueur); */
        /* fonctioninfocombat(messageinfocombatjoueur, "-40")
                fonctionmajtexteinfocombat(messageinfocombatjoueur); */
      }
    );

    this.physics.add.collider(
      this.caisse,

      [pnj1, this.caisse2], // * ajout de colision entres sprites

      function colision(personnage, collisionsprite) {
        collisionsprite.setImmovable(true);
        if (collisionsprite.texture.key === "caisse") {
          if (directionpersonnage === "gauche") {
            collisionsprite.setVelocity(-20, 0);
            genius.timeursecondes(
              0.5,
              () => {
                collisionsprite.setVelocity(0, 0);
              },
              "once"
            );
          }
          if (directionpersonnage === "droite") {
            collisionsprite.setVelocity(20, 0);
            genius.timeursecondes(
              0.5,
              () => {
                collisionsprite.setVelocity(0, 0);
              },
              "once"
            );
          }
          if (directionpersonnage === "haut") {
            collisionsprite.setVelocity(0, -20);
            genius.timeursecondes(
              0.5,
              () => {
                collisionsprite.setVelocity(0, 0);
              },
              "once"
            );
          }
          if (directionpersonnage === "bas") {
            collisionsprite.setVelocity(0, 20);
            genius.timeursecondes(
              0.5,
              () => {
                collisionsprite.setVelocity(0, 0);
              },
              "once"
            );
          }
        } else {
        }

        /*       etat.stun(joueur); */
        /* fonctioninfocombat(messageinfocombatjoueur, "-40")
                fonctionmajtexteinfocombat(messageinfocombatjoueur); */
      }
    );

    // todo -----                                                                    ANIMATIONS

    //TODO -------                                ANIMATION PERSONNAGE
    // marche bas
    this.anims.create({
      key: "bas",
      frames: this.anims.generateFrameNumbers("personnage", {
        frames: [0, 1, 0, 2],
      }),
      frameRate: 7,
      repeat: -1,
    });
    // marche haut
    this.anims.create({
      key: "haut",
      frames: this.anims.generateFrameNumbers("personnage", {
        frames: [6, 7, 6, 8],
      }),
      frameRate: 7,
      repeat: -1,
    });
    // marche gauche
    this.anims.create({
      key: "gauche",
      frames: this.anims.generateFrameNumbers("personnage", {
        frames: [3, 4, 3, 5],
      }),
      frameRate: 7,
      repeat: -1,
    });
    // marche droite
    this.anims.create({
      key: "droite",
      frames: this.anims.generateFrameNumbers("personnage", {
        frames: [9, 10, 9, 11],
      }),
      frameRate: 7,
      repeat: -1,
    });

    //TODO -------                                ANIMATION PNJ1

    // marche bas
    this.anims.create({
      key: "baspnj1",
      frames: this.anims.generateFrameNumbers("pnj", {
        frames: [0, 1, 0, 2],
      }),
      frameRate: 6,
      repeat: -1,
    });
    // marche haut
    this.anims.create({
      key: "hautpnj1",
      frames: this.anims.generateFrameNumbers("pnj", {
        frames: [6, 7, 6, 8],
      }),
      frameRate: 6,
      repeat: -1,
    });
    // marche gauche
    this.anims.create({
      key: "gauchepnj1",
      frames: this.anims.generateFrameNumbers("pnj", {
        frames: [3, 4, 3, 5],
      }),
      frameRate: 6,
      repeat: -1,
    });
    // marche droite
    this.anims.create({
      key: "droitepnj1",
      frames: this.anims.generateFrameNumbers("pnj", {
        frames: [9, 10, 9, 11],
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "cacpnj1",
      frames: this.anims.generateFrameNumbers("pnj", {
        frames: [12, 13, 14],
      }),
      frameRate: 6,
      repeat: -1,
    });

    //TODO -------                                ANIMATION bombe

    this.anims.create({
      key: "animbombe",
      frames: this.anims.generateFrameNumbers("bombe", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 10,
      repeat: -1,
    });
    /*  this.bombe.play("animbombe"); */
    //TODO -------                                ANIMATION vapeurbombe

    this.anims.create({
      key: "animvapeurbombe",
      frames: this.anims.generateFrameNumbers("vapeurbombe", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 16, 17, 18, 19, 20],
      }),
      frameRate: 18,
      repeat: 0,
    });
    /*     this.vapeurbombe.play("animvapeurbombe"); */

    //TODO -------                                ANIMATION pierre magique

    this.anims.create({
      key: "filet",
      frames: this.anims.generateFrameNumbers("filet", {
        frames: [0, 1, 2, 1],
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.filet.play("filet");

    // todo -----                                           ANIMATION Bouclier
    this.anims.create({
      key: "bouclieranim",
      frames: this.anims.generateFrameNumbers("bouclier", {
        frames: [0, 1, 2, 1],
      }),
      frameRate: 15,
      repeat: -1,
    });
    // todo --------------------                             ANIMATION ublo

    this.anims.create({
      key: "animublo",
      frames: this.anims.generateFrameNumbers("ublo", {
        frames: [0, 1, 2, 1, 2, 3, 2, 3, 4, 4, 3, 3, 2, 1],
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.ublo.play("animublo");

    // todo --------------------                    ANIMATION lampadaire

    this.anims.create({
      key: "animlampadaire",
      frames: this.anims.generateFrameNumbers("lampadaire", {
        frames: [0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.lampadaire.play("animlampadaire");

    // todo --------------------                            ANIMATION ecu
    this.anims.create({
      key: "animecu",
      frames: this.anims.generateFrameNumbers("ecu", {
        frames: [0, 1, 2, 3, 2, 1],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.ecu.play("animecu");

    // todo --------------------                            ANIMATION vieux
    this.anims.create({
      key: "animvieux",
      frames: this.anims.generateFrameNumbers("vieux", {
        frames: [0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      }),
      frameRate: 8,
      repeat: -1,
    });

    vieux.play("animvieux");
    // todo --------------------                            ANIMATION vieux
    this.anims.create({
      key: "animfemmecity",
      frames: this.anims.generateFrameNumbers("femme1", {
        frames: [0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.femmecity1.play("animfemmecity");

    //TODO -------                                                                       EVENT TOUCHES

    // todo         touche déplacement bas
    //! clavier
    touche.S.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        personnageimmobile = false;
        vitessepersonnage = joueur.vit;
        directionpersonnage = "bas";

        // * vitesse normal
        if (vitessepersonnage === 1) {
          personnage.play("bas");
          personnage.setVelocity(0, 150);
        }
        // * vitesse courir
        else if (vitessepersonnage === 2) {
          personnage.setVelocity(0, 190);
          personnage.play("bas");
        }
        // * vitesse boosté
        else if (vitessepersonnage === 3) {
          personnage.setVelocity(0, 240);
          personnage.play("bas");
        }
        // * vitesse 0
        else if (vitessepersonnage === 0) {
          personnage.setVelocity(0, 0);
        }
        // * vitesse réduite
        else if (vitessepersonnage === 0.5) {
        }
      }
    });
    //!MANETTE
    this.input.gamepad.on("down", (e) => {
      if (e.buttons[13].pressed) {
        if (enconversation.value === true) {
        } else {
          personnageimmobile = false;
          vitessepersonnage = joueur.vit;
          directionpersonnage = "bas";

          // * vitesse normal
          if (vitessepersonnage === 1) {
            personnage.play("bas");
            personnage.setVelocity(0, 150);
          }
          // * vitesse courir
          else if (vitessepersonnage === 2) {
            personnage.setVelocity(0, 190);
            personnage.play("bas");
          }
          // * vitesse boosté
          else if (vitessepersonnage === 3) {
            personnage.setVelocity(0, 240);
            personnage.play("bas");
          }
          // * vitesse 0
          else if (vitessepersonnage === 0) {
            personnage.setVelocity(0, 0);
          }
          // * vitesse réduite
          else if (vitessepersonnage === 0.5) {
          }
        }
      }
    });

    //todo                                                             touche déplacement haut
    //! clavier
    touche.Z.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        personnageimmobile = false;
        directionpersonnage = "haut";
        personnage.setVelocity(0, -150);

        personnage.play("haut");
      }
    });
    //!MANETTE
    this.input.gamepad.on("down", (e) => {
      if (e.buttons[12].pressed) {
        personnage.stop();
        if (enconversation.value === true) {
        } else {
          personnageimmobile = false;
          directionpersonnage = "haut";
          personnage.setVelocity(0, -150);

          personnage.play("haut");
        }
      }
    });

    // todo                                                    touche déplacement gauche
    //! clavier
    touche.Q.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        personnageimmobile = false;
        directionpersonnage = "gauche";
        personnage.setVelocity(-160, 0);
        personnage.play("gauche");
        if (touche.S.isUp && touche.D.isUp && touche.Z.isUp) {
        }
      }
    });
    //!MANETTE
    this.input.gamepad.on("down", (e) => {
      if (e.buttons[14].pressed) {
        if (enconversation.value === true) {
        } else {
          personnageimmobile = false;
          directionpersonnage = "gauche";
          personnage.setVelocity(-160, 0);
          personnage.play("gauche");
          if (touche.S.isUp && touche.D.isUp && touche.Z.isUp) {
          }
        }
      }
    });

    // todo                  touche déplacement droite

    touche.D.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        personnageimmobile = false;
        directionpersonnage = "droite";
        personnage.setVelocity(160, 0);
        personnage.play("droite");
        if (touche.Q.isUp && touche.S.isUp && touche.Z.isUp) {
        }
      }
    });
    //!MANETTE
    this.input.gamepad.on("down", (e) => {
      if (e.buttons[15].pressed) {
        if (enconversation.value === true) {
        } else {
          personnageimmobile = false;
          directionpersonnage = "droite";
          personnage.setVelocity(160, 0);
          personnage.play("droite");
          if (touche.Q.isUp && touche.S.isUp && touche.Z.isUp) {
          }
        }
      }
    });

    // todo                  touche ECHAP

    touche.ESC.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        degats(5, joueur.def);
      }
    });

    // todo                  touche ESPACE

    touche.SPACE.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        if (joueur.vitesse === 1) {
          joueur.vitesse = 2;
        } else if (joueur.vitesse === 2) {
          joueur.vitesse = 1;
        }
      }
    });

    // todo                                        touche NUMPAD 1
    touche.NUMPAD_ONE.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        if (bouclieractif) {
          bouclier.stop();
          bouclier.destroy();
          bouclieractif = false;
        } else if (bouclieractif === false) {
          bouclieractif = true;
          bouclier = scene.physics.add
            .sprite(500, 246, "bouclier")
            .setInteractive(scene.input.makePixelPerfect()) // hitbox parfaite
            .setSize(30, 50, true) // hitbox
            .setBounce(0, 0) // rebond sur colision
            .setCollideWorldBounds(true) // colision du monde
            .setDepth(3) // z-index
            .setScale(1, 1); // scale
          bouclier.play("bouclieranim");
        }
      }
    });

    // todo                                        touche NUMPAD 2

    touche.NUMPAD_TWO.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        let degatpnj;

        if (calculedistance(personnage, pnj1) < 90) {
          if (degatencours === true) {
          } else {
            degatencours = true;
            degatpnj = "- " + (joueur.atk - pnj1.def);
            degattextevilain = scene.add.text(pnj1.x, pnj1.y, degatpnj, styletextedegatvilain).setDepth(5);
            pnj1.setVelocity(3000, 0);
            scene.time.addEvent({
              delay: 500,
              callback: () => {
                degattextevilain.setVisible(false);
                degatencours = false;
              },
              loop: false,
            });
          }
        } else {
        }
      }
    });
    // todo                                        touche NUMPAD 3

    touche.NUMPAD_THREE.on("down", function (event) {
      if (enconversation.value === true) {
      } else {
        skills.bombe(bombe, bombe2, directionpersonnage, personnage, scene);

        let x;
        let y;
        if (directionpersonnage === "gauche") {
          x = personnage.x - 50;
          y = personnage.y;
        }
        if (directionpersonnage === "droite") {
          x = personnage.x + 50;
          y = personnage.y;
        }
        if (directionpersonnage === "haut") {
          x = personnage.x;
          y = personnage.y - 50;
        }
        if (directionpersonnage === "bas") {
          x = personnage.x;
          y = personnage.y + 50;
        }
        //TODO -------                                                               BOMBE
        if (bombe && bombe2) {
        } else if (bombe) {
          effetjeu.meche2.play();
          bombe2 = true;
          scene.bombe2 = scene.physics.add
            .sprite(x, y, "bombe")
            .setImmovable(true)
            .setDepth(0)
            .setSize(10, 20)
            .setInteractive(scene.input.makePixelPerfect());
          scene.physics.add.collider(personnage, [scene.bombe2], function colision(personnage, collisionsprite) {
            collisionsprite.setImmovable(true);
          });
          scene.bombe2.play("animbombe");
          scene.tweens.add({
            targets: scene.bombe2, // cible de l'effet
            ease: "Sine.In",
            duration: 4000,
            repeat: 0,
            yoyo: false,
            onupdate() {
              genius.timeursecondes("0.6", () => {
                console.log("bomlbe2 detruite");
                scene.bombe2.destroy();
                scene.bombe2 = null;
                bombe2 = false;
                genius.timeursecondes("0.1", () => {
                  effetjeu.vapeurbombe2.play();
                  scene.vapeurbombe = scene.physics.add
                    .sprite(x, y, "vapeurbombe")
                    .setImmovable(true)
                    .setDepth(4)
                    .setSize(5, 30)
                    .setScale(1, 1)
                    .setInteractive(scene.input.makePixelPerfect());
                  scene.vapeurbombe.play("animvapeurbombe");
                  genius.timeursecondes("1.2", () => {
                    scene.vapeurbombe.destroy();
                  });
                });
              });
            },
          });
        } else {
          effetjeu.meche.play();
          bombe = true;
          scene.bombe = scene.physics.add
            .sprite(x, y, "bombe")
            .setImmovable(true)
            .setDepth(0)
            .setSize(10, 20)
            .setInteractive(scene.input.makePixelPerfect());
          scene.physics.add.collider(personnage, [scene.bombe], function colision(personnage, collisionsprite) {
            collisionsprite.setImmovable(true);
          });
          scene.bombe.play("animbombe");
          scene.tweens.add({
            targets: scene.bombe, // cible de l'effet
            ease: "Sine.In",
            duration: 4000,
            repeat: 0,
            yoyo: false,
            onupdate() {
              genius.timeursecondes("0.6", () => {
                console.log("bomlbe detruite");
                scene.bombe.destroy();
                scene.bombe = null;
                bombe = false;
                genius.timeursecondes("0.1", () => {
                  effetjeu.vapeurbombe.play();
                  scene.vapeurbombe2 = scene.physics.add
                    .sprite(x, y, "vapeurbombe")
                    .setImmovable(true)
                    .setDepth(4)
                    .setSize(5, 30)
                    .setScale(1, 1)
                    .setInteractive(scene.input.makePixelPerfect());
                  scene.vapeurbombe2.play("animvapeurbombe");
                  genius.timeursecondes("1.2", () => {
                    scene.vapeurbombe2.destroy();
                  });
                });
              });
            },
          });
        }
      }
    });

    // todo                                        touche ENTER

    touche.ENTER.on("down", function (event) {
      lancementconversation();
      /*  if (calculedistance(personnage, vieux) < 80) {
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
      } */
    });

    this.input.gamepad.on("down", (e) => {
      if (e.buttons[0].pressed) {
        lancementconversation();
      }
    });

    //TODO                                        AJOUT DU TEXT SUR LE PNJ

    dialoguetext = scene.add.text(pnj1.x, pnj1.y, "Voyou" + String.fromCodePoint(parseInt("2666", 16)), styletextevilain).setDepth(5);

    //TODO -------                                       EVENT DEPLACEMENT PNJ1

    document.querySelector("body").addEventListener("deplacementpnj1", () => {
      if (directionpnj1 === "haut" && pnj1mouvement === false) {
        pnj1.mouvement = true;
      } else if (directionpnj1 === "bas") {
        pnj1.mouvement = true;
      } else if (directionpnj1 === "droite") {
        pnj1.mouvement = true;
      } else if (directionpnj1 === "gauche") {
        pnj1.mouvement = true;
      }
    });

    //TODO                                                                       EVENT PNJ1 LANCE ORBE
    genius.intervallesecondes(2.5, () => {
      if (orbeactive === true && !orbenoir) {
        orbenoir = scene.physics.add
          .sprite(pnj1.x, pnj1.y, "orbe")
          .setDepth(4)
          .setSize(10, 10)
          .setInteractive(this.input.makePixelPerfect())
          .setScale(0.25, 0.25);

        //TODO                                                                       COLLISION ORBE ET PERSONNAGE EVENT
        this.physics.add.collider(
          personnage,

          orbenoir, // ajout de colision entres sprites

          function colision(personnage, collisionsprite) {
            let degat = "- " + (pnj1.atk - joueur.def);
            jeu.affichagedegat(degat, personnage, scene);
            //? Avec bouclier
            voix.degathomme1.play();
            joueur.reductionpv(pnj1.atk - joueur.def);
            joueur.jaugeultiplus(5);
            scene.tweens.add({
              targets: personnage, // cible de l'effet
              from: (personnage.tint = 0xffffff),
              to: (personnage.tint = 0xff0000),
              x: personnage.x - 1,
              ease: "Sine.In",
              duration: 50,
              repeat: 0,
              yoyo: true,
              onupdate() {
                genius.timeursecondes(0.1, () => {
                  personnage.tint = 0xffffff;
                });
                /*         personnage.tint = 0xff0000; */
              },
            });
            if (bouclieractif) {
              console.log("orbre absorbé");
            }

            console.log("orbe recu");

            orbeactive = false;

            if (orbenoir) {
              orbenoir.destroy();
              orbenoir = null;
            }

            /* orbenoir.setActive = false
              orbeactive.setVisible = false */
          }
        );
      } else if (orbeactive === true && calculedistance(personnage, pnj1) < 100) {
        orbenoir = scene.physics.add.sprite(pnj1.x, pnj1.y, "orbe").setDepth(4).setSize(10, 10).setInteractive(this.input.makePixelPerfect());
      }
      {
      }
    });
  } //* -------------- fin de create ()

  // !                                                                     U   P   D   A   T   E

  update() {
    this.input.gamepad.once("disconnected", () => {
      notifgeneral("manette débranchée");
      manette.active = false;
    });
    this.input.gamepad.once("connected", (e) => {
      console.log(e);
      var axisH = e.axes[0].getValue();
      var axisV = e.axes[1].getValue();
      notifgeneral("manette branchée");
      manette.active = true;
    });
    /* 
    if (manette.active) {
      var pad = this.input.gamepad.getPad(0);

      if (pad.axes.length) {
        var axisH = pad.axes[0].getValue();
        var axisV = pad.axes[1].getValue();
        if (axisV > 0) {
          console.log(axisV);

          personnage.setVelocity(0, 150);
        } else {
          console.log(axisV);

          personnage.setVelocity(0, -150);
        }
        if (axisH > 0) {
          console.log(axisV);
          personnage.play("gauche");
          personnage.setVelocity(150, 0);
        } else {
          console.log(axisV);

          personnage.setVelocity(-150, 0);
        }
      }
    } */

    // TODO                                           MUSIQUE AMBIANCE
    if (scene.gamepad) {
      console.log(yo);
    }
    if (ambiance.villemeca.paused) {
      ambiance.villemeca.play();
    }
    // TODO                                           AI PNJ1

    // a moins de 60 m
    /*   if (calculedistance(personnage, pnj1) < 90 && orbeactive === false) { } */
    /*      console.log("event orbe");
      orbeactive = true; */
    /* 
          camera.setZoom(2, 2, 5, "ease"); */
    /* camera.shake(1000, 0.025); */
    /*       etat.stun(joueur); */
    /* fonctioninfocombat(messageinfocombatjoueur, "-40")
                  fonctionmajtexteinfocombat(messageinfocombatjoueur); */
    // fonction lors de la colision
    /*   document.body.dispatchEvent(new CustomEvent("orbepnj1")); */
    /*  personnage.alpha = 1; // changer opacité du personnage */
    /*  camera.setZoom(2, 2); */

    // TODO                                           ORBE PNJ SUIS LE JOUEUR SI ELLE EXISTE
    if (orbenoir) {
      if (orbenoir.active) {
        scene.physics.moveToObject(orbenoir, personnage, 150);
      } else {
      }
    }
    // a moins de 300 m
    if (calculedistance(personnage, pnj1) < 300 && calculedistance(personnage, pnj1) > 90) {
      scene.physics.moveToObject(pnj1, personnage, 50);
    } else if (calculedistance(personnage, pnj1) < 100 && calculedistance(personnage, pnj1) > 90) {
      orbeactive = true;
    } else if (calculedistance(personnage, pnj1) > 300 && calculedistance(personnage, pnj1) > 90) {
    } else if (calculedistance(personnage, pnj1) < 90) {
      orbeactive = true;
      pnj1.setVelocity(0, 0);
      if (!pnj1.anims.isPlaying) {
        pnj1.play("cacpnj1");
      } else {
        pnj1.stop();
      }
    }

    /* if ) {
      
  
     
     /*  pnj1.flipY = true;
    }  */
    // TODO                                           PIERRE MAGIQUE QUI SUIT LE JOUEUR
    if (calculedistance(personnage, projectile) < 50) {
      projectile.setVelocity(0, 0);
    } else {
      scene.physics.moveToObject(projectile, personnage, 90);
    }

    parralax.tilePositionX += 0.2;

    // Stopper les mouvements
    // TODO                                           EVENT PERSONNAGE NE BOUGE PLUS
    if (manette.active === false) {
      if (touche.Q.isUp && touche.S.isUp && touche.D.isUp && touche.Z.isUp) {
        personnageimmobile = true;

        if (directionpersonnage === "haut") {
          personnage.anims.setCurrentFrame(this.anims.get("haut").frames[0]);
        } else if (directionpersonnage === "bas") {
          personnage.anims.setCurrentFrame(this.anims.get("bas").frames[0]);
        } else if (directionpersonnage === "gauche") {
          personnage.anims.setCurrentFrame(this.anims.get("gauche").frames[0]);
        } else if (directionpersonnage === "droite") {
          personnage.anims.setCurrentFrame(this.anims.get("droite").frames[0]);
        }
        /*  personnage.stop(); */

        personnage.setVelocity(0, 0);
      }
    } else if (manette.active === true && this.input.gamepads) {
      if (
        this.input.gamepad.gamepads[0].buttons[12].pressed === false &&
        this.input.gamepad.gamepads[0].buttons[13].pressed === false &&
        this.input.gamepad.gamepads[0].buttons[14].pressed === false &&
        this.input.gamepad.gamepads[0].buttons[15].pressed === false
      ) {
        personnageimmobile = true;

        if (directionpersonnage === "haut") {
          personnage.anims.setCurrentFrame(this.anims.get("haut").frames[0]);
        } else if (directionpersonnage === "bas") {
          personnage.anims.setCurrentFrame(this.anims.get("bas").frames[0]);
        } else if (directionpersonnage === "gauche") {
          personnage.anims.setCurrentFrame(this.anims.get("gauche").frames[0]);
        } else if (directionpersonnage === "droite") {
          personnage.anims.setCurrentFrame(this.anims.get("droite").frames[0]);
        }
        /*  personnage.stop(); */

        personnage.setVelocity(0, 0);
      }
    }

    // TODO                                           DEPLACEMENT diagonale PERSONNAGE
    /*  
    //diagonale haut/droite
      if (touche.Z.isDown && touche.D.isDown) {
      personnage.setVelocity(100, -100);
    }

    // diagonale bas/droite
    if (touche.S.isDown && touche.D.isDown) {
      personnage.setVelocity(100, 100);
    }
    // diagonale haut/GAUCHE
    if (touche.Z.isDown && touche.Q.isDown) {
      personnage.setVelocity(-100, -100);
    }
    // diagonale bas/GAUCHE
    if (touche.S.isDown && touche.Q.isDown) {
      personnage.setVelocity(-100, 100);
    } 
    */
    // TODO                                           BOUCLIER SUIS LE JOUEUR
    if (bouclieractif === true) {
      bouclier.setPosition(personnage.x, personnage.y);
    } else if (bouclieractif === false && bouclier) {
      bouclier.destroy();
    }

    // TODO                                           TEXTE DEGAT SUIS LE JOUEUR
    if (jeu.degattexte != null) {
      jeu.degattexte.setPosition(personnage.x - jeu.degattexte.width / 2, personnage.y - personnage.height + 100); // maj position du text degat sur le joueur
    }

    // TODO                                           TEXT SUIS LE PNJ
    dialoguetext.setPosition(pnj1.x - dialoguetext.width / 2, pnj1.y - pnj1.height + 100);

    // TODO                                           TEXT degat SUIS LE PNJ
    if (degattextevilain != null) {
      degattextevilain.setPosition(pnj1.x - degattextevilain.width / 2, pnj1.y - pnj1.height + pnj1.height / 2);
    }

    //TODO ----------------------------------------------
    //TODO ------- MAJ ANIMATIUON PNJ-----
    //TODO ----------------------------------------------

    if (
      pnj1.body.velocity.x > 0 &&
      Phaser.Math.Angle.Between(personnage.x, personnage.y, pnj1.x, pnj1.y).toFixed() > 1 &&
      calculedistance(personnage, pnj1) > 90
    ) {
      document.body.dispatchEvent(new CustomEvent("deplacementpnj1"));
      pnj1.play("droitepnj1", true);
      directionpnj1 = "droite";
    } else if (
      pnj1.body.velocity.x < 0 &&
      Phaser.Math.Angle.Between(personnage.x, personnage.y, pnj1.x, pnj1.y).toFixed() < 1 &&
      Phaser.Math.Angle.Between(personnage.x, personnage.y, pnj1.x, pnj1.y).toFixed() > -1 &&
      calculedistance(personnage, pnj1) > 90
    ) {
      document.body.dispatchEvent(new CustomEvent("deplacementpnj1"));
      pnj1.play("gauchepnj1", true);
      directionpnj1 = "gauche";
    } else if (
      pnj1.body.velocity.y > 0 &&
      Phaser.Math.Angle.Between(personnage.x, personnage.y, pnj1.x, pnj1.y).toFixed() < -1 &&
      Phaser.Math.Angle.Between(personnage.x, personnage.y, pnj1.x, pnj1.y).toFixed() > -3 &&
      calculedistance(personnage, pnj1) > 90
    ) {
      document.body.dispatchEvent(new CustomEvent("deplacementpnj1"));
      pnj1.play("baspnj1", true);
      directionpnj1 = "bas";
    } else if (
      pnj1.body.velocity.y < 0 &&
      Phaser.Math.Angle.Between(personnage.x, personnage.y, pnj1.x, pnj1.y).toFixed() > 0 &&
      Phaser.Math.Angle.Between(personnage.x, personnage.y, pnj1.x, pnj1.y).toFixed() < 2 &&
      calculedistance(personnage, pnj1) > 90
    ) {
      document.body.dispatchEvent(new CustomEvent("deplacementpnj1"));
      pnj1.play("hautpnj1", true);
      directionpnj1 = "haut";
    } else {
    }

    // TODO                                           MAJ ZINDEX pnj1

    if (personnage.y < pnj1.y) {
      pnj1.depth = 4;
    } else if (personnage.y > pnj1.y) {
      pnj1.depth = 2;
    }

    // TODO                                           MAJ ZINDEX bombe
    if (bombe) {
      if (personnage.y < scene.bombe.y) {
        scene.bombe.depth = 4;
      } else if (personnage.y > scene.bombe.y) {
        scene.bombe.depth = 2;
      }
    } else if (bombe2) {
      if (personnage.y < scene.bombe2.y) {
        scene.bombe2.depth = 4;
      } else if (personnage.y > scene.bombe2.y) {
        scene.bombe2.depth = 2;
      }
    }
    // TODO                                           MAJ ZINDEX caisse

    if (personnage.y < scene.caisse.y) {
      scene.caisse.depth = 4;
    } else if (personnage.y > scene.caisse.y) {
      scene.caisse.depth = 2;
    }
    if (personnage.y < scene.caisse2.y) {
      scene.caisse2.depth = 4;
    } else if (personnage.y > scene.caisse2.y) {
      scene.caisse2.depth = 2;
    }

    // TODO                                           MAJ ZINDEX MAISONS
    // MAISON COTE GAUCHE 1
    if (personnage.y < scene.maisoncotegauche1.y + 100) {
      scene.maisoncotegauche1.depth = 4;
    } else if (personnage.y > scene.maisoncotegauche1.y + 100) {
      scene.maisoncotegauche1.depth = 2;
    }

    // MAISON GRANDE
    if (personnage.y < scene.maisongrande.y + 200) {
      scene.maisongrande.depth = 4;
    } else if (personnage.y > scene.maisongrande.y + 200) {
      scene.maisongrande.depth = 2;
    }

    // TODO                                           ECU
    if (calculedistance(personnage, ecu) < 30) {
      if (ecurecup === false) {
        joueur.augmentationargent(1);

        this.ecu.destroy();
        effetjeu.ecu.play();
        ecurecup = true;
        notifgeneral("Or récupéré");
      }
    } else {
    }
  } // * fin update()

  //!                                                                    FIN DE SCENE
}
