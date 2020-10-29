export function scrollToElm(container, elm, duration) {
  const pos = getRelativePos(container, elm);
  scrollTo(container, pos.top - 150, 1); // duration in seconds
}

function getRelativePos(container, elm) {
  const pPos = container.getBoundingClientRect(); // parent pos
  const cPos = elm.getBoundingClientRect(); // target pos
  const pos = {};

  pos.top = cPos.top - pPos.top + elm.parentNode.scrollTop;
  pos.right = cPos.right - pPos.right;
  pos.bottom = cPos.bottom - pPos.bottom;
  pos.left = cPos.left - pPos.left;

  return pos;
}

function scrollTo(element, to, duration, onDone) {
  const start = element.scrollTop;
  const change = to - start;
  const startTime = performance.now();
  let now;
  let elapsed;
  let t;

  function animateScroll() {
    now = performance.now();
    elapsed = (now - startTime) / 1000;
    t = elapsed / duration;

    element.scrollTop = start + change * easeInOutQuad(t);

    if (t < 1) window.requestAnimationFrame(animateScroll);
    else onDone && onDone();
  }

  animateScroll();
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
