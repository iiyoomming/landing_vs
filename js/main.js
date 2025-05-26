const wrap = document.querySelector(".wrap");
const container = document.querySelector(".container");
let pages = document.querySelectorAll(".page");
let wrapWidth = wrap.offsetWidth;
let totalPages = pages.length;
let currentPage = 1;
let isScrolling = false;

function isDesktop() {
  return window.innerWidth > 1280;
}

function makeClone() {
  const firstClone = pages[0].cloneNode(true);
  const lastClone = pages[pages.length - 1].cloneNode(true);
  firstClone.classList.add("page-clone");
  lastClone.classList.add("page-clone");
  container.append(firstClone);
  container.prepend(lastClone);
}

function hideClonesOnMobile() {
  const clones = container.querySelectorAll(".page-clone");
  clones.forEach((clone) => {
    clone.style.display = isDesktop() ? "flex" : "none";
  });
}

function scrollToPage(index) {
  container.style.transition = "0.5s";
  container.style.left = -(index * wrapWidth) + "px";

  // 마지막에서 처음으로 루프
  if (index === totalPages + 1) {
    setTimeout(() => {
      container.style.transition = "0s";
      container.style.left = -wrapWidth + "px";
      currentPage = 1;
    }, 500);
  }

  // 처음에서 마지막으로 루프
  if (index === 0) {
    setTimeout(() => {
      container.style.transition = "0s";
      container.style.left = -(totalPages * wrapWidth) + "px";
      currentPage = totalPages;
    }, 500);
  }
}

function handleScroll(event) {
  if (!isDesktop()) return;

  event.preventDefault();
  if (isScrolling) return;

  isScrolling = true;
  setTimeout(() => (isScrolling = false), 800);

  if (event.deltaY > 0) {
    currentPage++;
  } else {
    currentPage--;
  }

  scrollToPage(currentPage);
}

function addScrollListener() {
  window.addEventListener("wheel", handleScroll, { passive: false });
}

function removeScrollListener() {
  window.removeEventListener("wheel", handleScroll);
}

function handleResize() {
  wrapWidth = wrap.offsetWidth;
  if (isDesktop()) {
    addScrollListener();
    container.style.left = -(currentPage * wrapWidth) + "px";
  } else {
    removeScrollListener();
    container.style.transition = "none";
    container.style.left = "0px";
    currentPage = 1;
  }

  hideClonesOnMobile();
}

// 초기화
makeClone();
container.style.left = -wrapWidth + "px";

// 이벤트 바인딩
window.addEventListener("resize", handleResize);
handleResize(); // 최초 실행
