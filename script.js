"use strict";

/* =========================================
   BIRTHDAY CONFIGURATION
   ========================================= */

const birthdayConfig = {
  friendName: "okay"
};

/* =========================================
   HTML ELEMENTS
   ========================================= */

const screens = document.querySelectorAll(".screen");

const openGiftButton = document.getElementById("open-gift");
const celebrateButton = document.getElementById("celebrate");
const restartButton = document.getElementById("restart");

const confettiContainer = document.getElementById("confetti-container");

const wishCakeWrap = document.querySelector(".wish-cake-wrap");
const blowCandlesButton = document.getElementById("blow-candles");
const wishCakeMessage = document.getElementById("wish-cake-message");
const continueAfterWishButton =
  document.getElementById("continue-after-wish");

const birthdaySong = document.getElementById("birthday-song");

const friendNameHeading = document.getElementById("friend-name-heading");
const friendNameLetter = document.getElementById("friend-name-letter");

/* =========================================
   SET FRIEND'S NAME
   ========================================= */

if (friendNameHeading) {
  friendNameHeading.textContent = birthdayConfig.friendName;
}

if (friendNameLetter) {
  friendNameLetter.textContent = birthdayConfig.friendName.toLowerCase();
}

/* =========================================
   SCREEN NAVIGATION
   ========================================= */

function showScreen(screenId) {
  const targetScreen = document.getElementById(screenId);

  if (!targetScreen) {
    console.error("Screen not found:", screenId);
    return;
  }

  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  targetScreen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* Open the birthday surprise */

if (openGiftButton) {
  openGiftButton.addEventListener("click", function () {
    showScreen("wish");
    launchConfetti(55);
  });
}

/* Navigate using data-go buttons */

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", function () {
    showScreen(button.dataset.go);
  });
});

/* =========================================
   CONFETTI ANIMATION
   ========================================= */

function launchConfetti(amount = 100) {
  if (!confettiContainer) {
    return;
  }

  const symbols = [
    "🕷️", "🕸️", "🔴", "🕷", "💥", "🕸️",
    "🔵", "🕷️", "⚡", "🕸", "🕷️", "💥"
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.fontSize = `${14 + Math.random() * 18}px`;

    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 1.5;

    piece.style.setProperty("--duration", `${duration}s`);

    piece.style.setProperty(
      "--drift",
      `${Math.random() * 180 - 90}px`
    );

    piece.style.animationDelay = `${delay}s`;

    confettiContainer.appendChild(piece);

    window.setTimeout(() => {
      piece.remove();
    }, (duration + delay) * 1000 + 500);
  }
}

/* =========================================
   BLOW OUT BIRTHDAY CANDLES
   ========================================= */

if (blowCandlesButton && wishCakeWrap) {
  blowCandlesButton.addEventListener("click", function () {
    if (wishCakeWrap.classList.contains("blown")) {
      return;
    }

    wishCakeWrap.classList.add("blown");

    wishCakeMessage.textContent =
      "✨ Wish made! May all your wishes come true! ✨";

    /* Start birthday music after the user's click */

    if (birthdaySong) {
      birthdaySong.loop = true;

      birthdaySong.play().catch((error) => {
        console.error("Could not play the birthday song:", error);
      });
    }

    blowCandlesButton.hidden = true;

    if (continueAfterWishButton) {
      continueAfterWishButton.hidden = false;
    }

    launchConfetti(100);
  });
}

/* =========================================
   FINAL BIRTHDAY CELEBRATION
   ========================================= */

if (celebrateButton) {
  celebrateButton.addEventListener("click", function () {
    launchConfetti(150);

    celebrateButton.textContent = "HAPPY BIRTHDAY, Maidhuri! 🎂";
    celebrateButton.disabled = true;
    celebrateButton.setAttribute("aria-live", "polite");
  });
}

/* =========================================
   REPLAY THE EXPERIENCE
   ========================================= */

if (restartButton) {
  restartButton.addEventListener("click", function () {
    /* Reset the celebration button */

    if (celebrateButton) {
      celebrateButton.disabled = false;

      celebrateButton.textContent =
        "One last birthday celebration 🎉";
    }

    /* Reset the birthday cake */

    if (wishCakeWrap) {
      wishCakeWrap.classList.remove("blown");
    }

    if (wishCakeMessage) {
      wishCakeMessage.textContent =
        "🎂 Make a wish and blow out the candles! 🎂";
    }

    if (blowCandlesButton) {
      blowCandlesButton.hidden = false;
    }

    if (continueAfterWishButton) {
      continueAfterWishButton.hidden = true;
    }

    /* Return to the intro screen */

    showScreen("home");
    launchConfetti(35);
  });
}
