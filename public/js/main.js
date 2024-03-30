//TODO ----------------------------------------------
//TODO ------- NEUTRALINO -----
//TODO ----------------------------------------------

//TODO ------- FONCTION FERMER JEU -----

function fermer() {
  Neutralino.app.exit();
}
function minimiser() {
  Neutralino.window.minimize();
}

//TODO ------- FONCTION CENTRER APP ECRAN -----
Neutralino.events.on("ready", () => {
  Neutralino.window.setDraggableRegion("fenetre");
  /*   Neutralino.window.move(screen.width / 2 - 683, screen.height / 2 - 384); */
});

//TODO ------- LANCEMENT -----
Neutralino.init();
Neutralino.window.focus();
//TODO ------- NEUTRALINO EVENT-----

Neutralino.events.on("windowClose", fermer);

//TODO ------- Document EVENT-----
onload = () => {};
document.getElementById("minimize").addEventListener("click", () => {
  minimiser();
});
document.getElementById("close").addEventListener("click", () => {
  fermer();
});
oncontextmenu = () => {
  return false;
};

//TODO ------- App-----

let cheat = [
  // transformation
  { titre: "Vampire", code: "traits.equip_trait trait_OccultVampire" },
  { titre: "Mage ", code: "traits.equip_trait trait_Occult_WitchOccult" },
  { titre: "Alien", code: "traits.equip_trait trait_OccultAlien" },
  { titre: "Mermaid", code: "traits.equip_trait trait_OccultMermaid" },
  { titre: "Stalker Ghost", code: "traits.equip_trait trait_Ghost_Curses_NightStalker_Stalker" },
  { titre: "Ghost temporary", code: "traits.equip_trait trait_Ghost_SeanceTable" },
  { titre: "Skeleton", code: "traits.equip_trait Trait_Hidden_Skeleton_ServiceSkeleton" },
  { titre: "Robot", code: "traits.equip_trait trait_Humanoid_Robots_MainTrait" },
  { titre: "Spectral Look", code: "traits.equip_trait trait_Magic_Marketstall_SpectralLook" },
  // Careers
  { titre: "Paranormal Promote", code: "careers.promote Paranormalinvestigator" },
  { titre: "Doctor Promote", code: "careers.promote doctor" },
  { titre: "Detective Promote", code: "careers.promote detective" },
  { titre: "Scientist Promote", code: "careers.promote adult_active_scientist" },
  { titre: "Artist Promote", code: "careers.promote adult_freelancer_agency_artist" },
  { titre: "Programmer Promote", code: "careers.promote adult_freelancer_agency_programmer" },
  { titre: "Writer Promote", code: "careers.promote adult_freelancer_agency_writer" },
  { titre: "Actor Promote", code: "careers.promote actor" },
  { titre: "Decorator Promote", code: "careers.promote deco" },
  { titre: "Photographer Promote", code: "careers.promote adult_freelancer_agency_fashion" },
  { titre: "Crafter Promote", code: "careers.promote adult_freelancer_agency_maker" },
  { titre: "Disable Sim death", code: "Death.toggle false" },
];

// todo ------------ for each

cheat.forEach((element) => {
  let div = document.createElement("div");
  div.className = "blockcheat";

  let p = document.createElement("p");
  p.textContent = element.titre;
  div.appendChild(p);

  let p2 = document.createElement("p");
  p2.textContent = element.code;
  div.appendChild(p2);

  let boutton = document.createElement("button");
  boutton.className = "bouttoncopie";
  boutton.textContent = "Copy";
  div.appendChild(boutton);
  document.getElementById("block").appendChild(div);
});

// todo ------------------------- copie

document.querySelectorAll(".bouttoncopie").forEach((element) => {
  element.addEventListener("click", (e) => {
    console.log("copie");
    console.log(e.target);
    console.log(e.target.parentElement);
    let code = e.target.parentElement.children;
    navigator.clipboard.writeText(code[1].textContent);
    console.log(code[1].textContent);
  });
});
