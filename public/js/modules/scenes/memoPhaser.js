//  *  METHODES PHASER 3

// TODO                                            charger des ressources à partir d'une url

this.load.setBaseURL("http://labs.phaser.io");

// TODO                                            Animation apparition/disparition sprite

this.tweens.add({
  targets: personnage, // cible de l'effet
  alpha: { from: 0, to: 1 },
  ease: "Sine.InOut",
  duration: 3000,
  repeat: -1,
  yoyo: true,
}); // effet apparition EXEMPLE

// TODO                                            Secouer la caméra

camera.shake(1000, 0.025);

// TODO                                            CHNGER LA FRAME

this.caisse2.setFrame(1);

// TODO                                            ZOOM caméra

camera.setZoom(2, 2, 5, "ease");

// TODO                                           Sprite bouge vers un autre

scene.physics.moveToObject(orbenoir, personnage, 250);

// TODO                                           Draggable Sprite

this.input.setDraggable(personnage);
personnage.on("drag", function (pointer, dragX, dragY) {
  personnage.x = dragX;
  personnage.y = dragY;
});
// creation d'un sprite draggable

// TODO                                           Récupération de la souris

var pointer = this.input.activePointer; // recuperation de la souris (pointer)

this.input.on("pointermove", () => {
  console.log(pointer.x);
}); // event souris bouge

this.input.on("pointerdown", () => {
  console.log("click appuyé");
}); // event souris click gaucher

// TODO                                           Event souris sur sprite

personnage.on("pointerover", function () {
  this.setTint(0xff0000);
});

personnage.on("pointerout", function () {
  this.setTint();
});

// TODO                                           COMBO TOUCHE EN JEU (exemple pour MONEY)

var combo = this.input.keyboard.createCombo("MONEY", { resetOnMatch: true }); // creation dun comba de touche (touche une apres l autre M puis O etc..)
this.input.keyboard.on("keycombomatch", function (e) {
  console.log(e);
  //event combo effectué
  if (genius.compareTAB(e.keyCodes, [77, 79, 78, 69, 89])) {
    console.log("Bravo , le code money vous donne 1000 pieces");
  }
});
// TODO                                           CAMERA suis le sprite
camera.startFollow(personnage);

// TODO                                           CAMERA flash
this.cameras.main.on("cameraflashstart", function (cam, fx, duration) {
  logo.setVisible(true);
});

this.cameras.main.on("cameraflashcomplete", function () {
  logo.setVisible(false);
});

//  Every time you click, shake the camera
this.input.on(
  "pointerdown",
  function () {
    this.cameras.main.flash();
  },
  this
);

// TODO                                           CAMERA ignore object
cam2.ignore([image1, image2]);
// todo                                       Timeur event phaser

var timer = scene.time.addEvent({
  delay: 500, // ms
  callback: function deplacementbas() {},
  //args: [],
  callbackScope: this,
  loop: false,
});
// todo                                      Fullscreen
scene.scale.toggleFullscreen();
