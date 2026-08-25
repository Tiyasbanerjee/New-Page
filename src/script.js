const main = document.getElementById('main');
const page2 = document.getElementById('page-2');

let accumulatedDelta = 0;
let isLocked = false;
let hasSlid = false;

// Threshold = 20% of the viewport height
const getThreshold = () => window.innerHeight * 0.2;

window.addEventListener('wheel', (e) => {
  // Prevent normal browser scrolling
  e.preventDefault();

  if (isLocked) return;

  // Track downward scrolling intent
  if (e.deltaY > 0 && !hasSlid) {
    accumulatedDelta += e.deltaY;

    // Trigger slide once the threshold (20%) is met
    if (accumulatedDelta >= getThreshold()) {
      isLocked = true;
      hasSlid = true;

      // Slide the entire #main up by 1 full screen (100vh)
      main.style.transform = 'translateY(-100vh)';

      // Re-enable interactions after the slide transition completes (1000ms)
      setTimeout(() => {
        isLocked = false;
      }, 1000);
    }
  } 
  // Allow sliding back up to page-1 when scrolling upwards on page-2
  else if (e.deltaY < 0 && hasSlid) {
    accumulatedDelta += e.deltaY;

    if (accumulatedDelta <= 0) {
      isLocked = true;
      hasSlid = false;
      accumulatedDelta = 0;

      main.style.transform = 'translateY(0)';

      setTimeout(() => {
        isLocked = false;
      }, 1000);
    }
  }
}, { passive: false });