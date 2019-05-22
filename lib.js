const snapEls = [...document.getElementsByClassName("snap")];
const snapCount = snapEls.length;
let scrollPosition = 0;
let lastScroll = 0;

const scrollDelay = 500;

const pageCount = document.createElement("div");
pageCount.id = "page-count";
document.body.appendChild(pageCount);
scroll();

window.addEventListener("mousewheel", (e) => {
  const now = Date.now();
  if (now - lastScroll < scrollDelay) return;
  lastScroll = now;

  if (e.deltaY > 0) scrollDown();
  else scrollUp();
})

window.addEventListener("keyup", (e) => {
  if (e.keyCode === 40) scrollDown();
  else if (e.keyCode === 38) scrollUp();
});

function scrollDown() {
  if (scrollPosition < snapCount - 1) {
    scrollPosition++;
    scroll();
  }
}

function scrollUp() {
  if (scrollPosition > 0) {
    scrollPosition--;
    scroll();
  }
}

function scroll() {
  window.scrollTo({
    top: scrollPosition * window.innerHeight,
    behavior: "smooth"
  });
  pageCount.innerHTML = `${ scrollPosition + 1 }/${ snapCount }`;
  if (pageChange) pageChange(scrollPosition + 1);
}