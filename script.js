const svg = document.getElementById("star-map-svg");
const starInfo = document.getElementById("star-info");
const toggleConstellationsBtn = document.getElementById(
  "toggle-constellations"
);
const searchBar = document.getElementById("search-bar");

let isConstellationVisible = false;
let scale = 1;

// Zoom functionality
document.getElementById("zoom-in").addEventListener("click", () => {
  scale = Math.min(scale + 0.2, 3);
  svg.style.transform = `scale(${scale})`;
});

document.getElementById("zoom-out").addEventListener("click", () => {
  scale = Math.max(scale - 0.2, 0.5);
  svg.style.transform = `scale(${scale})`;
});

// Toggle constellation lines
// Ensure all constellations and labels are hidden on page load
document
  .querySelectorAll(".constellation-line, .constellation-label")
  .forEach((element) => {
    element.style.display = "none"; // Hide lines and labels initially
  });

toggleConstellationsBtn.addEventListener("click", () => {
  isConstellationVisible = !isConstellationVisible; // Toggle visibility

  // Toggle visibility of constellations and labels
  document
    .querySelectorAll(".constellation-line, .constellation-label")
    .forEach((element) => {
      element.style.display = isConstellationVisible ? "block" : "none";
    });

  // Apply or remove the glow effect based on visibility
  document.querySelectorAll(".star").forEach((star) => {
    if (isConstellationVisible) {
      star.classList.add("glow"); // Add glowing effect when constellations are visible
    } else {
      star.classList.remove("glow"); // Remove glowing effect when constellations are hidden
    }
  });
});

// Display star info
document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", () => {
    const name = star.getAttribute("data-name");
    const distance = star.getAttribute("data-distance");
    starInfo.innerHTML = `<strong>${name}</strong><br>Distance: ${distance}`;
  });
});

// Search functionality
document.getElementById("search-button").addEventListener("click", function () {
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value.trim().toLowerCase(); // Normalize case and trim whitespace

  const constellationDetails = Object.keys(constellationsData).find(
    (key) => key.toLowerCase() === searchQuery
  );

  // Remove highlight from all constellations
  document.querySelectorAll(".constellation").forEach((constellation) => {
    constellation.classList.remove("highlight");
  });

  if (constellationDetails) {
    // Highlight the searched constellation
    const constellationGroup = document.getElementById(
      constellationDetails.toLowerCase().replace(" ", "-")
    ); // Ensure ID matches the name in a slugified format

    if (constellationGroup) {
      constellationGroup.classList.add("highlight");
    }

    // Display constellation details
    const details = constellationsData[constellationDetails];
    document.getElementById(
      "constellation-name"
    ).innerText = `Name: ${constellationDetails}`;
    document.getElementById(
      "constellation-coordinates"
    ).innerText = `Coordinates: ${details.coordinates}`;
    document.getElementById(
      "constellation-distance"
    ).innerText = `Distance: ${details.distance}`;
    document.getElementById(
      "constellation-facts"
    ).innerText = `Facts: ${details.facts}`;
  } else {
    // If no match found
    document.getElementById("constellation-name").innerText =
      "No constellation found!";
    document.getElementById("constellation-coordinates").innerText = "";
    document.getElementById("constellation-distance").innerText = "";
    document.getElementById("constellation-facts").innerText = "";
  }
});

// Example data for constellations
const constellationsData = {
  Draco: {
    coordinates: "Thuban (150, 300), Eltanin (170, 280), Rastaban (140, 260)",
    distance: "Closest star (Eltanin): 154 light-years",
    facts:
      "Draco represents a dragon and is one of the largest constellations in the sky.",
  },
  "Ursa Minor": {
    coordinates: "Polaris (100, 200), Kochab (120, 220), Pherkad (110, 190)",
    distance: "Closest star (Polaris): 323 light-years",
    facts: "Ursa Minor contains Polaris, the current North Star.",
  },
  Cepheus: {
    coordinates: "Alderamin (180, 400), Alfirk (200, 370), Errai (170, 350)",
    distance: "Closest star (Alderamin): 49 light-years",
    facts: "Cepheus is named after a king from Greek mythology.",
  },
  "Ursa Major": {
    coordinates: "Dubhe (300, 500), Merak (320, 520), Alkaid (350, 480)",
    distance: "Closest star (Merak): 79 light-years",
    facts: "Ursa Major contains the Big Dipper, a prominent asterism.",
  },
  "Corona Borealis": {
    coordinates:
      "Alphecca (400, 600), Nusakan (420, 620), Theta CrB (410, 580)",
    distance: "Closest star (Alphecca): 75 light-years",
    facts:
      "Corona Borealis represents a crown and is a small but striking constellation.",
  },
  Cassiopeia: {
    coordinates: "Schedar (450, 700), Caph (470, 720), Gamma Cas (480, 680)",
    distance: "Closest star (Caph): 54 light-years",
    facts: "Cassiopeia is easily recognized by its 'W' shape.",
  },
  Auriga: {
    coordinates: "Capella (500, 800), Menkalinan (520, 820), Elnath (530, 780)",
    distance: "Closest star (Capella): 42 light-years",
    facts: "Auriga is associated with a charioteer in mythology.",
  },
  Perseus: {
    coordinates: "Algol (550, 900), Mirfak (570, 920), Atik (560, 880)",
    distance: "Closest star (Mirfak): 590 light-years",
    facts: "Perseus is named after a hero from Greek mythology.",
  },
  Andromeda: {
    coordinates: "Alpheratz (600, 1000), Mirach (620, 1020), Almach (610, 980)",
    distance: "Closest star (Mirach): 197 light-years",
    facts: "Andromeda is home to the famous Andromeda Galaxy.",
  },
  "Canis Major": {
    coordinates: "Sirius (650, 1100), Mirzam (670, 1120), Adhara (660, 1080)",
    distance: "Closest star (Sirius): 8.6 light-years",
    facts: "Canis Major contains Sirius, the brightest star in the night sky.",
  },
  Taurus: {
    coordinates:
      "Aldebaran (700, 1200), Elnath (720, 1220), T Tauri (710, 1180)",
    distance: "Closest star (Aldebaran): 65 light-years",
    facts: "Taurus is home to the Pleiades and Hyades star clusters.",
  },
  Hydra: {
    coordinates:
      "Alphard (750, 1300), Gamma Hya (770, 1320), Zeta Hya (760, 1280)",
    distance: "Closest star (Alphard): 177 light-years",
    facts: "Hydra is the largest constellation in the night sky.",
  },
  Cygnus: {
    coordinates: "Deneb (800, 1400), Albireo (820, 1420), Sadr (810, 1380)",
    distance: "Closest star (Albireo): 434 light-years",
    facts: "Cygnus is known as the Swan and contains the Northern Cross.",
  },
  Pegasus: {
    coordinates: "Markab (850, 1500), Scheat (870, 1520), Algenib (860, 1480)",
    distance: "Closest star (Scheat): 199 light-years",
    facts: "Pegasus represents a winged horse from Greek mythology.",
  },
  "Canes Venatici": {
    coordinates:
      "Cor Caroli (900, 1600), La Superba (920, 1620), Beta CVn (910, 1580)",
    distance: "Closest star (Cor Caroli): 110 light-years",
    facts: "Canes Venatici is a small constellation representing hunting dogs.",
  },
  Leo: {
    coordinates:
      "Regulus (950, 1700), Denebola (970, 1720), Algieba (960, 1680)",
    distance: "Closest star (Regulus): 79 light-years",
    facts: "Leo is associated with the Nemean lion in Greek mythology.",
  },
  Pisces: {
    coordinates:
      "Alrescha (1000, 1800), Eta Piscium (1020, 1820), Omega Piscium (1010, 1780)",
    distance: "Closest star (Alrescha): 139 light-years",
    facts: "Pisces represents two fish tied together by their tails.",
  },
  Sagittarius: {
    coordinates:
      "Kaus Australis (1050, 1900), Nunki (1070, 1920), Ascella (1060, 1880)",
    distance: "Closest star (Kaus Australis): 140 light-years",
    facts: "Sagittarius contains the center of the Milky Way galaxy.",
  },
  Phoenix: {
    coordinates:
      "Ankaa (1100, 2000), Beta Phe (1120, 2020), Gamma Phe (1110, 1980)",
    distance: "Closest star (Ankaa): 77 light-years",
    facts: "Phoenix represents the mythical bird that rises from its ashes.",
  },
  Sextans: {
    coordinates:
      "Alpha Sex (1150, 2100), Beta Sex (1170, 2120), Gamma Sex (1160, 2080)",
    distance: "Closest star (Alpha Sex): 280 light-years",
    facts: "Sextans is a faint constellation representing a sextant.",
  },
  Lyra: {
    coordinates: "Vega (200, 100), Sheliak (220, 150), Sulafat (250, 120)",
    distance: "Closest star (Vega): 25 light-years",
    facts: "Lyra is often associated with the myth of Orpheus and his lyre.",
  },
  Orion: {
    coordinates:
      "Betelgeuse (300, 200), Bellatrix (330, 220), Rigel (360, 180)",
    distance: "Closest star (Bellatrix): 244 light-years",
    facts:
      "Orion is one of the most recognizable constellations in the night sky.",
  },
  CatusMajor: {
    coordinates: "Canopus (400, 300), Wazn (420, 320), Omicron CMa (410, 280)",
    distance: "Closest star (Canopus): 310 light-years",
    facts:
      "Catus Major represents a mythical cat and is known for its bright stars.",
  },
  Capricornus: {
    coordinates:
      "Deneb Algedi (500, 400), Nashira (520, 420), Dabih (510, 380)",
    distance: "Closest star (Deneb Algedi): 39 light-years",
    facts:
      "Capricornus is associated with the sea-goat from ancient mythology.",
  },
  Virgo: {
    coordinates:
      "Spica (600, 500), Vindemiatrix (620, 520), Porrima (610, 480)",
    distance: "Closest star (Spica): 260 light-years",
    facts: "Virgo represents the goddess of wheat and agriculture.",
  },
  Pegasus: {
    coordinates: "Markab (700, 600), Scheat (720, 620), Algenib (710, 580)",
    distance: "Closest star (Scheat): 199 light-years",
    facts: "Pegasus represents a winged horse from Greek mythology.",
  },
};

// Search functionality
document.getElementById("search-button").addEventListener("click", function () {
  const searchQuery = document.getElementById("search-input").value.trim();
  const constellationDetails = constellationsData[searchQuery];

  if (constellationDetails) {
    // Display constellation details
    document.getElementById("constellation-name").innerText = ` ${searchQuery}`;
    document.getElementById(
      "constellation-coordinates"
    ).innerText = `Coordinates: ${constellationDetails.coordinates}`;
    document.getElementById(
      "constellation-distance"
    ).innerText = `Distance: ${constellationDetails.distance}`;
    document.getElementById(
      "constellation-facts"
    ).innerText = `Facts: ${constellationDetails.facts}`;
  } else {
    // If no match found
    document.getElementById("constellation-name").innerText =
      "No constellation found!";
    document.getElementById("constellation-coordinates").innerText = "";
    document.getElementById("constellation-distance").innerText = "";
    document.getElementById("constellation-facts").innerText = "";
  }
});
// Add random stars to the background
const svag = document.getElementById("starry-sky");

function addRandomStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    star.setAttribute("cx", Math.random() * window.innerWidth);
    star.setAttribute("cy", Math.random() * window.innerHeight);
    star.setAttribute("r", Math.random() * 2 + 1); // Radius between 1 and 3
    star.setAttribute("fill", "silver");
    svg.appendChild(star);
  }
}

// Add 200 random stars
addRandomStars(200);
