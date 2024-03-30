let titre;
let parralax;
let parralax2;
let parralax3;
let lumiere1;
let lumiere2;
let lumiere3;
let lumiere4;

export class Titre extends Phaser.Scene {
  constructor() {
    super("Titre");
  }
  preload() {
    titre = this;
    // TODO  ________________________________________________________________   MAP  ____________________

    this.load.image("fond", "img/ciel3.png"); // import fond de scene
    // TODO  ________________________________________________________________   nuage ____________________

    this.load.image("nuage", "img/smoke.png"); // import fond de scene

    // TODO  ________________________________________________________________   nuage ____________________
    this.load.image("nuage2", "img/smoke2.png"); // import fond de scene

    // TODO  ________________________________________________________________   titre  ____________________
    this.load.image("moon", "img/moon.png"); // import fond de scene
    // TODO  ________________________________________________________________   titre  ____________________

    this.logo = this.load.image("logo", "img/logotitre3.png"); // import fond de scene
  }
  create() {
    document.querySelector("body").addEventListener("click", () => {
      this.scene.start('Niveau1');
      this.scene.remove('Titre');
    });
    parralax = this.add.tileSprite(1000, 0, 2732, 1536, "nuage").setDepth(4);
    parralax3 = this.add.tileSprite(1000, 1090, 2732, 1536, "nuage2").setDepth(7);
    parralax2 = this.add.tileSprite(1000, 768, 2732, 1536, "fond").setDepth(0);
    const logo = this.add.image(683, 384, "logo").setDepth(6);
    this.add.image(80, 34, "moon").setDepth(2);
    // VIOLET
    lumiere1 = this.add.pointlight(630, 430, 0, 170, 10).setDepth(5);
    lumiere1.attenuation = 0.01;
    lumiere1.color.setTo(180, 45, 250);
    // VERT
    lumiere2 = this.add.pointlight(520, 390, 0, 190, 10).setDepth(5);
    lumiere2.attenuation = 0.01;
    lumiere2.color.setTo(0, 250, 0);

    // ROUGE
    lumiere3 = this.add.pointlight(570, 340, 0, 200, 10).setDepth(5);
    lumiere3.attenuation = 0.01;
    lumiere3.color.setTo(250, 0, 0);

    // BLEU
    lumiere4 = this.add.pointlight(650, 280, 0, 120, 10).setDepth(5);
    lumiere4.attenuation = 0.01;
    lumiere4.color.setTo(0, 150, 250);

    this.tweens.add({
      targets: [lumiere1], // cible de l'effet
      alpha: { from: 1, to: 0.5 },
      ease: "Bounce.easeInOut",
      duration: 2000,
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: [lumiere2], // cible de l'effet
      alpha: { from: 1, to: 0.5 },
      ease: "Bounce.easeInOut",
      duration: 2500,
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: [lumiere3], // cible de l'effet
      alpha: { from: 1, to: 0.5 },
      ease: "Bounce.easeInOut",
      duration: 3000,
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: [lumiere4], // cible de l'effet
      alpha: { from: 1, to: 0.5 },
      ease: "Bounce.easeInOut",
      duration: 3500,
      repeat: -1,
      yoyo: true,
    });
  }

  update() {
    parralax.tilePositionX += 0.2;
    parralax2.tilePositionX -= 0.2;
    parralax3.tilePositionX -= 0.5;
  }
}
