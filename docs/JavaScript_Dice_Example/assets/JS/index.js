/************************************************************
 * Dicee Roulette — Beginner-friendly, fully commented JS
 * ---------------------------------------------------------
 * What this file does:
 * 1) Preloads images and a sound for smooth UX.
 * 2) Updates two dice images to random values (1–6).
 * 3) Animates each die on roll.
 * 4) Decides the winner and updates the text on the page.
 * 5) Lets users roll by clicking a button or pressing Space/Enter.
 ************************************************************/

/* -----------------------------
   0) Tiny helper: $
   -----------------------------
   This is a convenience function.
   Instead of writing `document.querySelector('.img1')` everywhere,
   we can write `$('.img1')`.
*/
const $ = (sel) => document.querySelector(sel);

/* -----------------------------
   1) Audio setup (one instance)
   -----------------------------
   We create ONE Audio object and reuse it each time.
   - Why one? Creating a new Audio on every click can be laggy and wasteful.
   - `preload = "auto"` asks the browser to fetch the file early.
   IMPORTANT: Autoplay of audio is blocked until the user interacts
   (click, keypress, etc.). That’s why we play it *inside* the click/keypress handler.
*/
const rollSound = new Audio("assets/audio/dicee.wav"); // <-- make sure this path is correct
rollSound.preload = "auto";

/* -----------------------------
   2) Preload dice images (optional but nice)
   -----------------------------
   This loads all dice faces (1–6) into the browser cache up front,
   so when we swap the image source, the change looks instant (no flicker).
*/
[1, 2, 3, 4, 5, 6].forEach((n) => {
  const img = new Image();
  img.src = `assets/images/dice_${n}.png`; // <-- make sure this folder & filenames exist
});

/* -----------------------------------------------------
   3) updateDie(imgSelector, value, animClass)
   -----------------------------------------------------
   Purpose:
   - Change one die image to show the number `value` (1..6)
   - Restart a CSS animation so it plays each time we roll

   Parameters:
   - imgSelector: string like ".img1" or ".img2" — which image to change
   - value: number 1..6 — which face to show
   - animClass: string like "animate-left" or "animate-right" — which CSS animation to use

   Returns:
   - The same value we set (useful to store in a variable)
*/
function updateDie(imgSelector, value, animClass) {
  // Find the image element in the DOM
  const img = $(imgSelector);
  if (!img) {
    // If we can’t find it, just return the intended value and do nothing
    // (Prevents errors if the HTML/classes change)
    return value;
  }

  // --- Restart the CSS animation ---
  // Why do we remove + add the class?
  // Because CSS animations run when a class is first applied.
  // To replay it, we remove the class and force the browser to reflow,
  // then add the class again.
  if (animClass) {
    img.classList.remove(animClass);

    // Force a "reflow" to make the browser register the removal.
    // Reading layout properties (like offsetWidth) forces this reflow.
    // After this, adding the class again will restart the animation.
    void img.offsetWidth;

    // Now re-add the class so the animation plays again
    img.classList.add(animClass);
  }

  // Update the actual image to the correct dice face
  img.src = `assets/images/dice_${value}.png`;

  // Update the alt text for accessibility (screen readers)
  img.alt = `Die shows ${value}`;

  return value;
}

/* -----------------------------
   4) rollOnce()
   -----------------------------
   Purpose:
   - Generate two random numbers (1..6)
   - Update both dice with animations
   - Decide who wins and update the on-screen text
   - Play the roll sound (if allowed by the browser)
*/
function rollOnce() {
  // Generate random integer 1..6 for each die
  const n1 = Math.floor(Math.random() * 6) + 1;
  const n2 = Math.floor(Math.random() * 6) + 1;

  // Update the left and right dice, with different same direction to emulate a roll
  const r1 = updateDie(".img1", n1, "animate-left");
  const r2 = updateDie(".img2", n2, "animate-left");

  // Grab the elements that show the result text
  const winnerEl = $(".winner");   // shows "Player 1", "Player 2", or "Nobody"
  const drawEl   = $(".draw");     // shows "wins!" or "— it's a draw!"
  const resultEl = $(".winResult"); // shows the winning number

  // Compare results and update the UI text
  if (r1 > r2) {
    winnerEl.textContent = "Player 1";
    drawEl.textContent   = "wins!";
    resultEl.textContent = r1;
  } else if (r2 > r1) {
    winnerEl.textContent = "Player 2";
    drawEl.textContent   = "wins!";
    resultEl.textContent = r2;
  } else {
    winnerEl.textContent = "Nobody";
    drawEl.textContent   = "— it's a draw!";
    resultEl.textContent = r1; // or r2, same number on a draw
  }

  // Try to play the sound
  // This should succeed because `rollOnce()` is called by a user action
  try {
    rollSound.currentTime = 0; // rewind so rapid clicks replay from start
    rollSound.play();
  } catch (e) {
    // If the browser blocked sound (no user gesture yet), we’ll see a warning.
    console.warn("Audio play blocked until first user interaction.", e);
  }
}

/* -----------------------------
   5) init()
   -----------------------------
   Purpose:
   - Set starting dice faces so images aren’t blank.
   - Attach event listeners:
       * Click on the "Roll" button
       * Press Space/Enter anywhere on the page
   - (Optional) Do an initial visual roll on page load (without sound).
*/
function init() {
  // Set initial faces to 1 on both dice (so the page looks complete)
  updateDie(".img1", 1, ""); // empty animClass means "no animation"
  updateDie(".img2", 1, "");

  // Hook up the main "Roll 🎲" button
  const btn = $("#rollBtn");
  if (btn) {
    btn.addEventListener("click", rollOnce);
  }

  // Add keyboard support:
  // If the user presses Space or Enter, we roll the dice.
  // `e.preventDefault()` stops the page from scrolling when pressing Space.
  document.addEventListener("keydown", (e) => {
    const isSpace = e.key === " ";
    const isEnter = e.key === "Enter";
    if (isSpace || isEnter) {
      e.preventDefault();
      rollOnce();
    }
  });

  // (Optional) If you want the dice to visually roll once on load (NO sound),
  // you can uncomment the next line. Note that auto-playing sound will still be blocked.
  // rollOnce();
}

/* -----------------------------
   6) Kick everything off
   -----------------------------
   We wait for the DOM to be ready before running init().
   Your <script> tag uses `defer`, which already delays execution until
   the HTML is parsed, but listening for DOMContentLoaded is still safe.
*/
document.addEventListener("DOMContentLoaded", init);

/* ---------------------------------------------------------
   Common beginner pitfalls to avoid (quick checklist):
   ---------------------------------------------------------
   1) Wrong paths:
      - Make sure "assets/images/dice_1.png" ... "dice_6.png" actually exist.
      - Make sure "assets/audio/dicee.wav" exists (or change the path).
   2) Autoplay audio:
      - Sound won’t play on page load; it must be triggered by a click or keypress.
   3) Mixed patterns:
      - Don’t keep old functions that use global variables AND new ones that pass args.
        Pick one pattern (this file uses the "updateDie/rollOnce" pattern).
   4) CSS classes:
      - Ensure your CSS defines `.animate-left` and `.animate-right`.
   5) Missing HTML:
      - Ensure your HTML has elements with classes: .img1, .img2, .winner, .draw, .winResult
      - Ensure there’s a button with id="rollBtn".
*/
