// ===============================
// MOBILE MENU TOGGLE
// ===============================
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const list = document.getElementById("mobileList");

  menu.addEventListener("click", () => {
    list.classList.toggle("open");
    menuIcon.classList.add("fade-out");

    setTimeout(() => {
      if (list.classList.contains("open")) {
        menuIcon.src = "img/close.png";
        menuIcon.alt = "Close menu";
      } else {
        menuIcon.src = "img/red menu.png";
        menuIcon.alt = "Open menu";
      }
      menuIcon.classList.remove("fade-out");
    }, 300);
  });
}
toggleMenu();

// ===============================
// SEARCH BOX FUNCTIONALITY
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchBox = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");
  const suggestionsList = document.getElementById("suggestions");

  const animations = [
    "Dragon Ball",
    "Solo Leveling",
    "Wind Breaker",
    "My Hero Academia",
    "Haikyu",
    "Dr. Stone",
  ];

  const animeLinks = {
    "Dragon Ball": "../../VISIT OLD HOME PAGE/Dragon Ball/index.html",
    "Solo Leveling": "../../VISIT OLD HOME PAGE/Solo Leveling/index.html",
    "Wind Breaker": "../../VISIT OLD HOME PAGE/Wind Breaker/index.html",
    "My Hero Academia": "../../VISIT OLD HOME PAGE/My Hero Academia/index.html",
    Haikyu: "../../VISIT OLD HOME PAGE/haikyu/index.html",
    "Dr. Stone": "../../VISIT OLD HOME PAGE/Dr. Stone/index.html",
  };

  searchIcon.addEventListener("click", () => {
    searchBox.classList.toggle("active");
    if (searchBox.classList.contains("active")) searchInput.focus();
    else {
      suggestionsList.innerHTML = "";
      searchInput.value = "";
    }
  });

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
        if (animeLinks[item]) window.location.href = animeLinks[item];
        else {
          searchInput.value = item;
          suggestionsList.innerHTML = "";
        }
      });
      suggestionsList.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target) && e.target !== searchIcon) {
      searchBox.classList.remove("active");
      suggestionsList.innerHTML = "";
      searchInput.value = "";
    }
  });
});

// ===============================
// CONTACT FORM SUBMISSION WITH IN-PAGE MESSAGE
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form form");

  // Create message div
  const messageDiv = document.createElement("div");
  messageDiv.className = "form-message";
  messageDiv.style.marginTop = "15px";
  messageDiv.style.fontWeight = "bold";
  contactForm.appendChild(messageDiv);

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      messageDiv.textContent = data.message || "Data Saved to MongoDB ✅";
      messageDiv.style.color = "green";

      contactForm.reset();

      // Remove message after 5 seconds
      setTimeout(() => {
        messageDiv.textContent = "";
      }, 5000);
    } catch (err) {
      console.error(err);
      messageDiv.textContent =
        "Error submitting the form. Please try again later.";
      messageDiv.style.color = "red";

      setTimeout(() => {
        messageDiv.textContent = "";
      }, 5000);
    }
  });
});
