// Toggle mobile menu visibility & change icon
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const list = document.getElementById("mobileList");

  menu.addEventListener("click", () => {
    list.classList.toggle("open");

    // Animate icon change
    menuIcon.classList.add("animate");

    setTimeout(() => {
      if (list.classList.contains("open")) {
        menuIcon.src = "img/close.png";
        menuIcon.alt = "Close";
      } else {
        menuIcon.src = "img/red menu.png";
        menuIcon.alt = "Menu";
      }
      menuIcon.classList.remove("animate");
    }, 200); // wait a bit before swapping image
  });
}
toggleMenu();

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchBox = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");
  const suggestionsList = document.getElementById("suggestions");

  const animations = [
    "Dragon Ball",
    "Solo Leveling",
    "Wind Breaker",
    "Attack On Titan",
    "Naruto",
    "Black Clover",
  ];

  const animeLinks = {
    "Dragon Ball": "VISIT OLD HOME PAGE/Dragon Ball/index.html",
    "Solo Leveling": "VISIT OLD HOME PAGE/Solo Leveling/index.html",
    "Wind Breaker": "VISIT OLD HOME PAGE/Wind Breaker/index.html",
    "Attack On Titan": "VISIT OLD HOME PAGE/Attack On Titan/index.html",
    Naruto: "VISIT OLD HOME PAGE/Naruto/index.html",
    "Black Clover": "VISIT OLD HOME PAGE/Black Clover/index.html",
  };

  // Toggle search box
  searchIcon.addEventListener("click", () => {
    searchBox.classList.toggle("active");
    if (searchBox.classList.contains("active")) {
      searchInput.focus();
    } else {
      suggestionsList.innerHTML = "";
      searchInput.value = "";
    }
  });

  // Show suggestions
  searchInput.addEventListener("input", () => {
    const inputValue = searchInput.value.trim().toLowerCase();
    suggestionsList.innerHTML = "";
    if (!inputValue) return;

    const matched = animations.filter((anim) =>
      anim.toLowerCase().startsWith(inputValue)
    );

    matched.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;

      li.addEventListener("click", () => {
        if (animeLinks[item]) {
          window.location.href = animeLinks[item];
        } else {
          searchInput.value = item;
          suggestionsList.innerHTML = "";
        }
      });

      suggestionsList.appendChild(li);
    });
  });

  // Close search when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target) && e.target !== searchIcon) {
      searchBox.classList.remove("active");
      suggestionsList.innerHTML = "";
      searchInput.value = "";
    }
  });
});

