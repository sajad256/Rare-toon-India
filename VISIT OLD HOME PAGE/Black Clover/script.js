// Toggle mobile menu visibility & change icon
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const list = document.getElementById("mobileList");

  menu.addEventListener("click", () => {
    list.classList.toggle("open");

    // Add fade-out class to start animation
    menuIcon.classList.add("fade-out");

    // After animation duration, swap image src and remove fade-out class
    setTimeout(() => {
      if (list.classList.contains("open")) {
        menuIcon.src = "img/close.png";  // Your close (X) icon
        menuIcon.alt = "Close menu";
      } else {
        menuIcon.src = "img/red menu.png";  // Your hamburger icon
        menuIcon.alt = "Open menu";
      }
      menuIcon.classList.remove("fade-out");
    }, 300); // Match with CSS transition duration (0.3s)
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
    "Dragon Ball": "../Dragon Ball/index.html",
    "Solo Leveling": "../Solo Leveling/index.html",
    "Wind Breaker": "../Wind Breaker/index.html",
    "Attack On Titan": "../Attack On Titan/index.html",
    "Naruto": "../Naruto/index.html",
    "Black Clover": "../Black Clover/index.html",
  };

  // Toggle search box visibility on icon click
  searchIcon.addEventListener("click", () => {
    searchBox.classList.toggle("active");
    if (searchBox.classList.contains("active")) {
      searchInput.focus();
    } else {
      suggestionsList.innerHTML = "";
      searchInput.value = "";
    }
  });

  // Show suggestions based on input value
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

  // Close search box and clear suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target) && e.target !== searchIcon) {
      searchBox.classList.remove("active");
      suggestionsList.innerHTML = "";
      searchInput.value = "";
    }
  });
});
